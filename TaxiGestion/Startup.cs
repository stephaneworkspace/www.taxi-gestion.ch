/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 *****************************************************************************/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TaxiGestion.Data;
using NSwag;
using NSwag.Generation.Processors.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;
using TaxiGestion.Mappings;
using TaxiGestion.Data.Repository.Authentification;
using TaxiGestion.Data.Repository.Comptabilite;
using TaxiGestion.Data.Repository.Affichage;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.FileProviders;
using System.IO;
using TaxiGestion.Data.Repository.Config;

namespace TaxiGestion
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private string _env;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
#pragma warning disable CS0162
            if (Constants.PROD)
                _env = "prod";
            else
                _env = "dev";
#pragma warning restore CS0162
            // Ne pas oublier de tenir compte qu'il y a aussi une autre
            // variable qui peut entrer en jeu: IWebHostEnvironment env
            // if (env.IsDevelopment())
            //
            // Constans.PROD est utilisé pour le choix de la base de donnée
            // - prod
            // - dev
            //
            // ainsi que pour les liens dans la partie frontend
            // - prod -> https://www.taxi-gestion.ch/...
            // - dev -> http://localhost
        }

        // This method gets called by the runtime. 
        // Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            if (_env == "prod")
                services.AddLetsEncrypt();
            // Backend uniquement
            // services.AddControllers().AddNewtonsoftJson();
            // FullStack Asp.net/Angular
            services.AddControllersWithViews();
            // In production, 
            // the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            // Sqlite est limité par :
            // - Regénération en cours de route avec les migrations ne 
            //   fonctionne pas
            // - Clé primaire composée comme en cobol ne fonctionne pas 
            //   l'autoincrement
            
            /*
            services
            .AddDbContext<DataContext>(x => x.UseLazyLoadingProxies()
            .UseSqlite("Filename=TaxiGestion.db", options =>
            {
                options.MigrationsAssembly(Assembly.
                                           GetExecutingAssembly().
                                           FullName);
            }));
            */
            
            /* 
            services.
            AddDbContext<DataContext>(x => x.UseLazyLoadingProxies()
            .UseSqlServer(Configuration.
            GetConnectionString("DefaultConnection")));
            */
            services.
                AddDbContext<DataContext>(SetDbContextOptionsForEnvironment, ServiceLifetime.Transient);

            services.AddOpenApiDocument(document => {
                document.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Name = "Authorization",
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Insérez JWT : Bearer {jwt}"
                });
                document.OperationProcessors.Add(
                    new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(
                                Configuration.GetSection("JWTSettings:Token").Value)
                            ),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddAutoMapper(typeof(Startup));
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddScoped<IAuthentificationRepository, AuthentificationRepository>();
            services.AddScoped<IConfigRepository, ConfigRepository>();
            services.AddScoped<IJournalisationRepository, JournalisationRepostiory>();
            services.AddScoped<IBilanRepository, BilanRepository>();
            services.AddScoped<IGestionEcritureJournalRepository, GestionEcritureJournalRepository>();
            services.AddScoped<IAffichageRepository, AffichageRepository>();
            services.AddTransient<Seed>();
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });
        }

        /// <summary>
        /// Méthode de séparation pour ef
        /// </summary>
        /// <param name="options"></param>
        private void SetDbContextOptionsForEnvironment(DbContextOptionsBuilder options)
        {
            options.UseLazyLoadingProxies();
            if (_env == "prod")
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            }
            else
            {
                options.UseSqlServer(Configuration.GetConnectionString("DevConnection"));
            }
        }

        // This method gets called by the runtime. 
        // Use this method to configure the HTTP request pipeline.
#pragma warning disable IDE0060 // Supprimer le paramètre inutilisé
        public void Configure(IApplicationBuilder app, 
                              IWebHostEnvironment env, 
                              Seed seeder)
#pragma warning restore IDE0060 // Supprimer le paramètre inutilisé
        {
            if (env.IsDevelopment() || _env == "dev")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // FullStack .net/Angular
                app.UseExceptionHandler("/Error");
                
                // The default HSTS value is 30 days.
                // You may want to change this for production scenarios, 
                // see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            if (env.IsProduction())
                app.UseHttpsRedirection();

            // Pour désactiver swagger en prod ? peut être un jour
            // if (!env.IsDevelopment())
            //    app.
            //    UseRewriter(new RewriteOptions().
            //    AddRedirect("index.html", "/")); // pas de swagger

            //FullStack .net/Angular
            app.UseStaticFiles(new StaticFileOptions()
            {
                ServeUnknownFileTypes = true, 
                DefaultContentType = "text/plain" 
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), "EMail"
                    )
                ),
                RequestPath = "/EMail"
            });

            app.UseSpaStaticFiles();

            app.UseRouting();

            /*
            // Asp.net core 3 preview 9
            app.Use(next => context =>
            {
                if (context.WebSockets.IsWebSocketRequest)
                {
                    context.Features
                    .Get<IHttpMaxRequestBodySizeFeature>()
                    ?.MaxRequestBodySize = null;
                }
                return next(context);
            });
            */

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(options => options
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
            );

            app.UseOpenApi();
            app.UseSwaggerUi3();

            // Seed 
            var swSeed = false;
            if (swSeed)
            {
                seeder.SeedDA01UtilisateurStephane(out int userStephane, out int userClientStephane);
                seeder.SeedDC01Classe(userClientStephane);
                seeder.SeedDC02Groupe(userClientStephane);
                seeder.SeedDC03SousGroupe(userClientStephane);
                seeder.SeedDC10Compte(userClientStephane);
                seeder.SeedDC31EcritureCollectiveJournal(userClientStephane, userStephane, "Stephane");
                seeder.SeedDA01UtilisateurPedro(out int userPedro, out int userClientPedro);
                seeder.SeedDC01Classe(userClientPedro);
                seeder.SeedDC02Groupe(userClientPedro);
                seeder.SeedDC03SousGroupe(userClientPedro);
                seeder.SeedDC10Compte(userClientPedro);
                seeder.SeedDC31EcritureCollectiveJournal(userClientPedro, userPedro, "Pedro");
            }

            app.UseEndpoints(endpoints =>
            {
                // Backend
                // endpoints.MapControllers();
                // FullStack .net/Angular
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            // FullStack .net/Angular
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA 
                // from ASP.NET Core, see:
                // https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}

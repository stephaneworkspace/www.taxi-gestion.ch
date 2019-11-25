FROM mcr.microsoft.com/dotnet/core-nightly/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core-nightly/sdk:3.1 AS build

WORKDIR /src
COPY ["TaxiGestion/TaxiGestion.csproj", "TaxiGestion/"]
RUN dotnet restore "TaxiGestion/TaxiGestion.csproj"

# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y build-essential nodejs

COPY . .

#RUN dotnet dev-certs https --clean
#RUN dotnet dev-certs https -ep /src/TaxiGestion/dev_cert.pfx -p 123456

WORKDIR "/src/TaxiGestion"
#RUN dotnet build "TaxiGestion.csproj" -c Release -o /app/build
RUN dotnet build "TaxiGestion.csproj" -c Debug -o /app/build

FROM build AS publish
#RUN dotnet publish "TaxiGestion.csproj" -c Release -o /app/publish
RUN dotnet publish "TaxiGestion.csproj" -c Debug -o /app/publish

FROM base AS final
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "TaxiGestion.dll"]

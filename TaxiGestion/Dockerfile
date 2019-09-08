FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["TaxiGestion/TaxiGestion.csproj", "TaxiGestion/"]
RUN dotnet restore "TaxiGestion/TaxiGestion.csproj"
COPY . .
WORKDIR "/src/TaxiGestion"
RUN dotnet build "TaxiGestion.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "TaxiGestion.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TaxiGestion.dll"]
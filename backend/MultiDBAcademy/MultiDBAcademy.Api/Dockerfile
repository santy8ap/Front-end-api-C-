# Imagen base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Imagen para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore "MultiDBAcademy.Api/MultiDBAcademy.Api.csproj"
RUN dotnet publish "MultiDBAcademy.Api/MultiDBAcademy.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MultiDBAcademy.Api.dll"]

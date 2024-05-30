using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ReactWithASP.Server.Models;

public static class ReactWithAspContextExtensions
{
    public static IServiceCollection AddReactWithAspContext(
      this IServiceCollection services, // The type to extend.
      string? connectionString = null)
    {
        if (connectionString is null)
        {
            SqlConnectionStringBuilder builder = new();

            builder.DataSource = ".";
            builder.InitialCatalog = "ReactWithAsp";
            builder.TrustServerCertificate = true;
            builder.MultipleActiveResultSets = true;

            // Because we want to fail faster. Default is 15 seconds.
            builder.ConnectTimeout = 3;

            // If using Windows Integrated authentication.
            builder.IntegratedSecurity = true;

            // If using SQL Server authentication.
            // builder.UserId = Environment.GetEnvironmentVariable("MY_SQL_USR");
            // builder.Password = Environment.GetEnvironmentVariable("MY_SQL_PWD");

            connectionString = builder.ConnectionString;
        }

        
        services.AddDbContext<ReactWithAspContext>(options =>
        {
            options.UseSqlServer(connectionString);

        });

        return services;
    }
}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ReactWithASP.Server.Models;

public class ReactWithAspContext : DbContext
{
    public ReactWithAspContext(DbContextOptions options) : base(options)
    {
    }

    protected ReactWithAspContext()
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Sale> Sales { get; set; }
    public virtual DbSet<Store> Stores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            SqlConnectionStringBuilder builder = new();

            builder.DataSource = "."; // "ServerName\InstanceName" e.g. @".\sqlexpress"
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

            optionsBuilder.UseSqlServer(builder.ConnectionString);
        }
    }
}

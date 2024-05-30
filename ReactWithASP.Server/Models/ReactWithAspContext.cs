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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure the Sale entity relationships
        modelBuilder.Entity<Sale>()
            .HasOne(s => s.Customer)
            .WithMany(c => c.Sales)
            .HasForeignKey(s => s.CustomerId);

        modelBuilder.Entity<Sale>()
            .HasOne(s => s.Product)
            .WithMany(p => p.Sales)
            .HasForeignKey(s => s.ProductId);

        modelBuilder.Entity<Sale>()
            .HasOne(s => s.Store)
            .WithMany(st => st.Sales)
            .HasForeignKey(s => s.StoreId);
    }
}

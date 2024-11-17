using System.Data;
using Microsoft.EntityFrameworkCore;

namespace TopDrivers.Infrastructure.Data;

public partial class TopDriverContext(DbContextOptions<TopDriverContext> options) : DbContext(options)
{
    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<New> News { get; set; }

    public virtual DbSet<Resource> Resources { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public IDbConnection Connection => Database.GetDbConnection();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Course");

            entity.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Event");

            entity.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<New>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_New");

            entity.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Resource");

            entity.Property(e => e.Path).HasDefaultValueSql("''");
            entity.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Service");

            entity.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");


            entity.Property(e => e.Email).HasDefaultValueSql("''");
            entity.Property(e => e.NickName).HasDefaultValueSql("''");
            entity.Property(e => e.Created).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        OnBeforeSaving();

        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    private void OnBeforeSaving()
    {
        DefaultProperties();
    }

    private void DefaultProperties()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.State == EntityState.Added)
            {
                if (entry.Entity.GetType().GetProperty("Created") != null && entry.Property("Created").CurrentValue == null) entry.Property("Created").CurrentValue = DateTimeOffset.Now;
                if (entry.Entity.GetType().GetProperty("IsActive") != null && (bool)entry.Property("IsActive").CurrentValue! == false) entry.Property("IsActive").CurrentValue = true;
                if (entry.Entity.GetType().GetProperty("IsEnabled") != null && (bool)entry.Property("IsEnabled").CurrentValue! == false) entry.Property("IsEnabled").CurrentValue = true;

                if (entry.Entity.GetType().GetProperty("CreatedBy") != null && entry.Property("ModifiedBy").CurrentValue != null)
                {
                    entry.Property("CreatedBy").CurrentValue = entry.Property("ModifiedBy").CurrentValue;
                    entry.Property("ModifiedBy").CurrentValue = null;
                }

                entry.Property("Modified").IsModified = false;
                entry.Property("ModifiedBy").IsModified = false;
            }
            else
            {
                if (entry.State == EntityState.Modified)
                {
                    if (entry.Entity.GetType().GetProperty("Modified") != null) entry.Property("Modified").CurrentValue = DateTimeOffset.Now;

                    entry.Property("Created").IsModified = false;
                    entry.Property("CreatedBy").IsModified = false;

                }
            }
        }
    }
}

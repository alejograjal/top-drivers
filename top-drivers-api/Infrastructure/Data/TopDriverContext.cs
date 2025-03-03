using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace TopDrivers.Infrastructure.Data;

public partial class TopDriverContext(DbContextOptions<TopDriverContext> options) : DbContext(options)
{
    const string CREATEDNAME = "Created";
    const string MODIFIEDNAME = "Modified";

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

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken)
    {
        OnBeforeSaving();
        return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private void OnBeforeSaving()
    {
        DefaultProperties();
    }

    private void DefaultProperties()
    {
        string createdByName = "CreatedBy";
        string modifiedByName = "ModifiedBy";

        DateTime created = DateTime.Now;
        DateTime modified = DateTime.Now;

        foreach (var entry in ChangeTracker.Entries())
        {
            string createdBy = string.Empty;
            string modifiedBy = null!;
            if (entry.Entity.GetType().GetProperty(createdByName) != null) createdBy = entry.Property(createdByName).CurrentValue!.ToString()!;
            if (entry.Entity.GetType().GetProperty(modifiedByName) != null)
            {
                var modificacion = entry.Property(modifiedByName).CurrentValue;
                if (modificacion != null) modifiedBy = modificacion.ToString()!;
            }

            if (entry.State == EntityState.Added)
            {
                GenerateAdded(entry, createdByName, createdBy, modifiedByName, created);
            }
            else
            {
                GenerateModified(entry, createdByName, modifiedByName, modifiedBy, modified);
            }
        }
    }

    private static void GenerateAdded(EntityEntry entry, string createdByName, string createdBy, string modifiedByName, DateTime created)
    {
        string isActiveName = "IsActive";

        if (entry.Entity.GetType().GetProperty(CREATEDNAME) != null && entry.Property(CREATEDNAME).CurrentValue != null) entry.Property(CREATEDNAME).CurrentValue = created;
        if (entry.Entity.GetType().GetProperty(isActiveName) != null && !(bool)entry.Property(isActiveName).CurrentValue!) entry.Property(isActiveName).CurrentValue = true;

        if (entry.Entity.GetType().GetProperty(createdByName) != null && entry.Property(modifiedByName).CurrentValue != null)
        {
            entry.Property(createdByName).CurrentValue = entry.Property(modifiedByName).CurrentValue;
            entry.Property(modifiedByName).CurrentValue = null;
        }

        if (entry.Entity.GetType().GetProperty(createdByName) != null) entry.Property(createdByName).CurrentValue = createdBy;
        if (entry.Entity.GetType().GetProperty(MODIFIEDNAME) != null) entry.Property(MODIFIEDNAME).IsModified = false;
        if (entry.Entity.GetType().GetProperty(modifiedByName) != null) entry.Property(modifiedByName).IsModified = false;
    }

    private static void GenerateModified(EntityEntry entry, string createdByName, string modifiedByName, string modifiedBy, DateTime modified)
    {
        if (entry.State == EntityState.Modified)
        {
            if (entry.Entity.GetType().GetProperty(MODIFIEDNAME) != null) entry.Property(MODIFIEDNAME).CurrentValue = modified;

            if (entry.Entity.GetType().GetProperty(modifiedByName) != null) entry.Property(modifiedByName).CurrentValue = modifiedBy;
            if (entry.Entity.GetType().GetProperty(CREATEDNAME) != null) entry.Property(CREATEDNAME).IsModified = false;
            if (entry.Entity.GetType().GetProperty(createdByName) != null) entry.Property(createdByName).IsModified = false;
        }
    }

    // private void DefaultProperties()
    // {
    //     foreach (var entry in ChangeTracker.Entries())
    //     {
    //         if (entry.State == EntityState.Added)
    //         {
    //             if (entry.Entity.GetType().GetProperty("Created") != null && entry.Property("Created").CurrentValue == null) entry.Property("Created").CurrentValue = DateTimeOffset.Now;
    //             if (entry.Entity.GetType().GetProperty("IsActive") != null && (bool)entry.Property("IsActive").CurrentValue! == false) entry.Property("IsActive").CurrentValue = true;
    //             if (entry.Entity.GetType().GetProperty("IsEnabled") != null && (bool)entry.Property("IsEnabled").CurrentValue! == false) entry.Property("IsEnabled").CurrentValue = true;

    //             if (entry.Entity.GetType().GetProperty("CreatedBy") != null && entry.Property("ModifiedBy").CurrentValue != null)
    //             {
    //                 entry.Property("CreatedBy").CurrentValue = entry.Property("ModifiedBy").CurrentValue;
    //                 entry.Property("ModifiedBy").CurrentValue = null;
    //             }

    //             entry.Property("Modified").IsModified = false;
    //             entry.Property("ModifiedBy").IsModified = false;
    //         }
    //         else
    //         {
    //             if (entry.State == EntityState.Modified)
    //             {
    //                 if (entry.Entity.GetType().GetProperty("Modified") != null) entry.Property("Modified").CurrentValue = DateTimeOffset.Now;

    //                 entry.Property("Created").IsModified = false;
    //                 entry.Property("CreatedBy").IsModified = false;

    //             }
    //         }
    //     }
    // }

}

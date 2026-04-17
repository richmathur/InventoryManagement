using InventoryManagement.Models;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using System.Runtime.Intrinsics.X86;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200") // Your Angular URL
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // This stops the infinite loop by ignoring the back-references
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

    // Optional: This keeps the JSON property names exactly as they are in C# (PascalCase)
    // options.JsonSerializerOptions.PropertyNamingPolicy = null; 
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<InventoryManagementContext>(options =>

    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();;
//Use CORS(Must be placed between UseRouting and UseAuthorization)
app.UseCors(myAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

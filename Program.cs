using EmergencyRescueSystem;
using RescueSystem;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// تسجيل هياكل البيانات كـ Singleton
builder.Services.AddSingleton<SinglyLinkedList>();
builder.Services.AddSingleton<RequestManager>();
builder.Services.AddSingleton<EmergencyPriorityQueue>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
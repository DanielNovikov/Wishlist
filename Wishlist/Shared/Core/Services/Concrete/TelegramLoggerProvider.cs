namespace Wishlist.Shared.Core.Services.Concrete;

public class TelegramLoggerProvider(IConfiguration configuration) : ILoggerProvider
{
    public ILogger CreateLogger(string categoryName)
    {
        return new TelegramLogger(configuration);
    }

    public void Dispose()
    {
    }
}
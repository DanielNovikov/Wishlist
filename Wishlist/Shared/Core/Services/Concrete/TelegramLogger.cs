using Telegram.Bot;

namespace Wishlist.Shared.Core.Services.Concrete;

public class TelegramLogger : ILogger
{
    private readonly TelegramBotClient _botClient;
    private readonly string _primaryChatId;
    private readonly string? _secondChatId;
    private readonly LogLevel _minimumLogLevel;

    public TelegramLogger(IConfiguration configuration)
    {
        var logLevelValue = configuration.GetSection("Logging")["LogLevel:Default"] ?? "Information";
        if (!Enum.TryParse(logLevelValue, true, out _minimumLogLevel))
        {
            _minimumLogLevel = LogLevel.Information;
        }

        var accessToken = configuration.GetValue<string>("TelegramLogOptions:AccessToken") ?? throw new ArgumentNullException();
        _primaryChatId = configuration.GetValue<string>("TelegramLogOptions:UserId") ?? throw new ArgumentNullException();
        _secondChatId = configuration.GetValue<string>("TelegramLogOptions:SecondaryUserId");

        _botClient = new TelegramBotClient(accessToken);
    }

    public bool IsEnabled(LogLevel logLevel)
    {
        return logLevel >= _minimumLogLevel;
    }

    public IDisposable? BeginScope<TState>(TState state) where TState : notnull
    {
        return null;
    }

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception,
        Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        if (formatter == null)
        {
            throw new ArgumentNullException(nameof(formatter));
        }
        
        // if (exception is TaskCanceledException or IOException) return;

        var logMessage = formatter(state, exception);
        
        if (logLevel == LogLevel.Information && !string.IsNullOrEmpty(_secondChatId))
            _botClient.SendTextMessageAsync(_secondChatId, logMessage);
        
        var message = $"[{logLevel}] {logMessage}";
        if (exception != null)
            message += $"\nMessage: {exception.Message}\nInner Exception: {exception.InnerException}\nException type: {exception.GetType().FullName}\nStack trace: {exception.StackTrace}";
        
        _botClient.SendTextMessageAsync(_primaryChatId, message);
    }
}
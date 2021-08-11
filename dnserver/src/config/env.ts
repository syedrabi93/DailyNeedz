export const {
    IS_PRODUCTION = process.env.NODE_ENV === "production",
    DB_URI = "mongodb://readWriteAnyDb:password@mongodb.napp.zap-torrent.com:6000/dnappdb",
    FIREBASE_CONFIG = {
        "type": "service_account",
        "project_id": "dailyneedz-a743e",
        "private_key_id": "44ce814bec97c293c12a8c6f16e14c099dfa0566",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnWVrH8up27tzH\nClxWK/YpNP6yYzmpNOEGoswHiL8+4rxef7qUELMtb63QsosL30wmIcCDnqoPrG1k\nC3XO7vx0+zCQ1pxiZN7z8iIIkxLNLHmrF3P4CAs0nBAml1ntn8Zmgotqfe6BI6eD\n3gkKnuf52lyYW6/j+n6jmcTVUdfYd9uxDrDsstwLfbAh99b/FHW74qHsQ+Dls79z\nMWV488r0vMcQT3+M47QJ/UqV3ZdfFHHVcNr8MHS0W8a/6n9Of0u9rPW9JInKvMNL\n05JfahVwIal6tQkjRY91uazeUx03g4y5m9pnSMARKduBnbhNFKlFXuYxx4mAsDiJ\ne4CLUbhpAgMBAAECggEAJAf+nkdkiRfzzB0kdV9AwG2LGyB3FUHv40xg7oxYVPNf\niF8q7l9MHM/LVkBi5Lr+u8UPnKcoSXigEubOxi+5hnxg4AZ9JEhAorhy8HKuHSPi\nzF4f13rv4rNpXM3AjIOWpZKc7uBPXlmtYxyGyNUe8DI+NoWjMMxJwPLGKQHWneIT\ndiSFyrrTdZRXzEZmCiDBtvtjKxDGmKalyuX7YosEq1N0jX5qlTvJ5xJzCGR+7q5I\nd/gGzvzylLK3oqwyBIAvkehOZEKYjujUn8qHfmi7GMxF0McTj+B5QmuA1uEkK9Bj\nNrgRvuME/xu2Wji/D4m5rjuxoXkenjsuGkFq/AQFKQKBgQDRHw9oQd6cCGzVlmDY\nQ0E308eFN7W1ZZOG70Lte91bPLM0gqOAWpifY3l/EeMalLIoYu1XNCwW5jlEdiCX\nD/KDncCfBJMsiQByUBg2wa6+BztV6CiBmrgX80Xe1oarZsOaBHMMkNWRc15T1R4h\nPfgCrsP4zYFuv0k2VTM9FpP4PQKBgQDM3RbhH5VIczCv3ORXCGiOvtIc7IIFRDb/\n7ZIHBhaM7A8NwEfuL2SPMlUz/fow+EMwG1Ik2a7no+4NiLgWehuuFFUWlgGtyEFd\nJ52nRYTQYjB5DdH7XXtLbNlTXKkcclXHDgjRxoHFUu9qpaExp8RWi1T2kZuCPjxS\ngRHzE6kXnQKBgQCadHt3wLb/vgVMmD49XSdNaaFDFsuiCD03e36OU19CJQojbZ3/\njmqNxvYU0YxQtKUFyVONhh5OZ4rCsxENIh038wszKDjfuuzWgavwvYsoFcVQhSFt\n4G26WtcvaHmdHVC5cDHdhRgIzxJLjuwrF08YBCcAnCDOQIB9nd4zb3qo7QKBgH0y\nRBAyT/Xlx4RCFx2FGvjZbuiUNOVpCb+f/RTjyJY4kP6TWqIaPncwiFdsyCBzKARX\nPf0dN0GCsjF9MxsxZocdD97sr3v3nNKEKlmWJ5N93iespX3bZET08V97ijHDQd6T\nGhqxGI9xnrTrIbaJ03gcUEEbPRD8XbsB++k0Q6sVAoGAVxRz6Bsg6hTYlZB20lgF\nw2k+JYhqdk9wcdpuuGH4OMaGmKcjy55OGBvQOP9uW9aWaDDJ2MsmdK5bTr8Vd3Pu\nZfcZtfwxeeECtN+nGi5GJI0WvjmqSSjbTYKYO6eBkimNlOLkbmNxTFdqQF+K+HJa\nOImkZJ9tzbBlS/MMVWVG+S4=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-1sfji@dailyneedz-a743e.iam.gserviceaccount.com",
        "client_id": "109821035679321663676",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1sfji%40dailyneedz-a743e.iam.gserviceaccount.com"
    }
} = process.env;
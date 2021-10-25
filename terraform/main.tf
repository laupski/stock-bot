terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

resource "heroku_app" "stock-bot-laupski" {
  name   = "stock-bot-laupski"
  region = "us"
  sensitive_config_vars = {
    CLIENTID = var.CLIENTID
    GUILDID = var.GUILDID
    BOTTOKEN = var.BOT_TOKEN
    ALPHAKEY = var.ALPHAKEY
  }


}

resource "heroku_build" "stock-bot-build" {
  app        = heroku_app.stock-bot-laupski.id
  source {
    url     = "https://github.com/laupski/stock-bot/archive/refs/tags/v0.1.0.tar.gz"
    version = "v0.1.0"
  }
  
  lifecycle {
    create_before_destroy = true  
  }
}

variable "app_quantity" {
  default     = 1  
  description = "Number of dynos in your Heroku formation"
}

resource "heroku_formation" "stock-bot-formation" {
  app        = heroku_app.stock-bot-laupski.id
  type       = "web"  
  quantity   = var.app_quantity  
  size       = "Free"  
  depends_on = [heroku_build.stock-bot-build]
}

output "app_url" {  
  value       = heroku_app.stock-bot-laupski.web_url  
  description = "Application URL"
}

variable "CLIENTID" {
    description = "Client ID of the stock-bot"
}

variable "GUILDID" {
    description = "Guild ID of the discord server"
}

variable "ALPHAKEY" {
    description = "Alpha Vantage API key"
}

variable "BOT_TOKEN" {
    description = "Discord bot token for accessing the API"
}

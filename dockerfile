# Use a imagem oficial do MongoDB como base
FROM mongo:latest

# Exponha a porta padrão do MongoDB
EXPOSE 27017

# Defina o usuário para executar o processo do MongoDB (boa prática de segurança)
USER mongodb

# Comando para iniciar o servidor MongoDB
CMD ["mongod", "--bind_ip", "0.0.0.0"]
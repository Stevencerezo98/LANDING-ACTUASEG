# Imagen base oficial ligera con Node.js 20 sobre Alpine Linux
FROM node:20-alpine

# Definir directorio de trabajo en el contenedor
WORKDIR /app

# Definir variables de entorno de producción
ENV NODE_ENV=production
ENV PORT=3000

# Copiar manifiestos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias necesarias para compilar y ejecutar
RUN npm install

# Copiar el código fuente y archivos de configuración
COPY . .

# Compilar frontend (Vite) y servidor (esbuild) para producción
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]

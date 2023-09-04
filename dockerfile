# Gunakan image Node.js versi 18.16 sebagai dasar
FROM node:18.16

# Buat direktori aplikasi dalam wadah
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam wadah
COPY package*.json ./

# Install dependensi proyek
RUN npm install
RUN npm install nodemon -g

# Salin berkas proyek Anda ke dalam wadah
COPY . .

# Expose port 3000 yang akan digunakan oleh aplikasi Anda
EXPOSE 3000

# Perintah untuk menjalankan index.js
CMD [ "npm", "start" ]

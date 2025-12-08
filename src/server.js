const app = require('./app');
const runSeed = require('./utils/seed');

const PORT = process.env.PORT || 3000;

// Popula dados iniciais
runSeed();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
import { app } from '#src/app.js';

const port = Number(process.env.PORT) || 3000;

app.listen(port, (error) => {
  if(error) throw error;
  
  console.log(`Server running on http://localhost:${port}`);
});
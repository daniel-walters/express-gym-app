import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.json({placeholder: "Express Gym App"});
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});
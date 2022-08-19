import app from './App';

app.set('port', process.env.PORT || 3333);

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
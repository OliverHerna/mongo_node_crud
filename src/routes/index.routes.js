import {Router} from 'express'
import Task from '../models/Task'

const router = Router();

router.get('/', async(req, res) => {
    const tasks = await Task.find().lean()
    console.log(tasks)
    res.render('index.hbs', {tasks : tasks})
});

router.get('/about', (req, res) => {
    res.render('about.hbs')
})

router.get('/edit/:id', async(req, res) => {
    try {
        const task  = await Task.findById(req.params.id).lean() 
        res.render('edit.hbs', {task : task}) 
    } catch (error) {
        console.log(error.message)
    }

});

router.post("/edit/:id", async(req,res ) => {
    await Task.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/")
});

router.get("/delete/:id", async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id) 
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
    

})

router.post('/tasks/add', async(req, res) => {
    try {
        const task = Task(req.body)
        await task.save()
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }

});

export default router;
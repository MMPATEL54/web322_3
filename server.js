const express = require('express');
const projectData = require('./modules/projects');
const path = require('path'); // Import path module for handling file paths

const app = express();
const PORT = process.env.PORT || 8080;

projectData.initialize()
    .then(() => {
        console.log("Projects initialized");

        // Route to serve the home page
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'home.html'));
        });

        // Route to serve the about page
        app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'about.html'));
        });

        // Route to handle projects with optional sector query
        app.get('/solutions/projects', (req, res) => {
            const sector = req.query.sector; // Get the sector query parameter
            if (sector) {
                // If a sector is provided, filter projects by sector
                projectData.getProjectsBySector(sector)
                    .then(projects => res.json(projects))
                    .catch(error => res.status(404).send(error));
            } else {
                // If no sector is provided, return all projects
                projectData.getAllProjects()
                    .then(projects => res.json(projects))
                    .catch(error => res.status(404).send(error));
            }
        });

        // Route to get a specific project by ID
        app.get('/solutions/projects/:id', (req, res) => {
            const id = parseInt(req.params.id);
            projectData.getProjectById(id)
                .then(project => res.json(project))
                .catch(() => res.status(404).send("Project not found"));
        });

        // Middleware to serve static files from the public directory
        app.use(express.static('public'));

        // Custom 404 handling for unsupported routes
        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); // Serve custom 404 page
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to initialize projects: ", error);
    });

// projects.js
const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(project => {
                const sector = sectorData.find(sector => sector.id === project.sector_id);
                let projectSector = {
                    ...project,
                    sector: sector ? sector.sector_name : "Unknown"
                };
                projects.push(projectSector);
            });
            console.log("Projects after initialization:", projects); // Add this line
            resolve();
        } catch (error) {
            reject("Error initializing projects: " + error.message);
        }
    });
}


function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found");
        }
    });
}


function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const projectFind = projects.find(project => project.id === projectId);
        if (projectFind) {
            resolve(projectFind);
        } else {
            reject("Unable to find requested project");
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const match = projects.filter(project => 
            project.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (match.length > 0) {
            resolve(match);
        } else {
            reject("Unable to find requested projects");
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

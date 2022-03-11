const tasks = [
    {
        _id: "caljcnalncalsnclakm",
        pageId: "abcdefghigklmno",
        heading: "Frontend Design",
        status: "in process",
        priority: {
            rate: 1,
            canWaitForExecution: "for a long time"
        },
        responsible: "Andrew Pillerwick",
        terms: "5 days",
        content: "Lorem ipsum 1000000"
    },
    {
        _id: "dVLSNVLoAMDAMDMAM",
        pageId: "abcdefghigklmno",
        heading: "Order Pizza",
        status: "completed",
        priority: {
            rate: 2,
            canWaitForExecution: "for 1-3 days"
        },
        responsible: "Lily Barbertale",
        terms: "5 minutes",
        content: "Lorem ipsum31230913"
    },
    {
        _id: "PJKSBVSNCANCKNKU",
        pageId: "abcdefghigklmno",
        heading: "Mongo DB setting",
        status: "not started",
        priority: {
            rate: 3,
            canWaitForExecution: "urgent"
        },
        responsible: "Bob Wilaskiss",
        terms: "3 days",
        content: "lorem ipsum 432912931"
    },
    {
        _id: "kjsbccalkmaJBKJ",
        pageId: "abcdefghigklmno",
        heading: "Order new Macs",
        status: "in process",
        priority: {
            rate: 2,
            canWaitForExecution: "for 1-3 days"
        },
        responsible: "Andrew Butterborrow",
        terms: "3 days",
        content: "lorem ipsum 432912931"
    },
    {
        _id: "imdfamcaimqLKLM",
        pageId: "abcdefghigklmno",
        heading: "Make a coffe break",
        status: "not started",
        priority: {
            rate: 1,
            canWaitForExecution: "urgent"
        },
        responsible: "Helen Portcigar",
        terms: "2-3 days",
        content: "lorem ipsum 432912931"
    },
    {
        _id: "jdnvskjbnakjnakncjnjc",
        pageId: "abcdefghigklmno",
        heading: "Choose the database to use",
        status: "completed",
        priority: {
            rate: 3,
            canWaitForExecution: "urgent"
        },
        responsible: "Isaac Wellerman",
        terms: "1 day",
        content: "Lorem Ipsum"
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(tasks);
        }, 1500);
    });

const getTaskById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(tasks.find((task) => task._id === id));
        }, 1500);
    });

const updateTask = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            for (const task of tasks) {
                if (task._id === data._id) {
                    for (const param in task) {
                        task[param] = data[param];
                    }
                }
            }
            resolve(true);
        }, 1200);
    });

const addTask = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            tasks.push(data);
        }, 1000);
        resolve("Added!");
    });

const removeTask = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            tasks.filter((task) => task._id !== id);
        });
        resolve("Removed!");
    });

export { fetchAll, getTaskById, updateTask, addTask, removeTask };

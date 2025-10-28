import express from 'express';
import path from 'path';
import fs from 'fs';
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Mock data for demonstration
let tickets = [
    {
        id: '1',
        name: 'Login issue',
        description: 'Users cannot access the platform',
        status: 'OPEN',
        priority: 'HIGH'
    },
    {
        id: '2',
        name: 'Payment processing',
        description: 'Payments are being delayed',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM'
    },
    {
        id: '3',
        name: 'UI bug on mobile',
        description: 'Buttons not displaying correctly',
        status: 'CLOSED',
        priority: 'LOW'
    }
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'twiglanding.twig'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.twig'));
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Simple mock authentication
    if (email && password) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'login.twig'));
    }
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.twig'));
});

app.post('/api/signup', (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (first_name && last_name && email && password) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'signup.twig'));
    }
});

app.get('/dashboard', (req, res) => {
    // Calculate stats
    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'OPEN').length;
    const resolvedTickets = tickets.filter(t => t.status === 'CLOSED').length;

    // Get recent activity
    const recentActivity = tickets.slice(0, 3).map(ticket => ({
        title: `Ticket: ${ticket.name}`,
        description: ticket.description || 'No description',
        time: 'Recently created'
    }));

    // Read template and replace variables
    let template = fs.readFileSync(path.join(__dirname, 'dashboard.twig'), 'utf8');

    // Simple template replacement (you might want to use a proper Twig engine)
    template = template
        .replace(/\{\{\s*stats\.total_tickets\|default\(0\)\s*\}\}/g, totalTickets)
        .replace(/\{\{\s*stats\.open_tickets\|default\(0\)\s*\}\}/g, openTickets)
        .replace(/\{\{\s*stats\.resolved_tickets\|default\(0\)\s*\}\}/g, resolvedTickets);

    // Replace recent activity (simplified)
    let activityHtml = '';
    if (recentActivity.length > 0) {
        recentActivity.forEach(activity => {
            activityHtml += `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium text-gray-900">${activity.title}</p>
                    <p class="text-sm text-gray-600">${activity.description}</p>
                </div>
                <span class="text-sm text-gray-500">${activity.time}</span>
            </div>`;
        });
    }

    template = template.replace(
        /\{\%\s*for\s+activity\s+in\s+recent_activity\s*\%\}.*?\{\%\s*else\s*\%\}.*?\{\%\s*endfor\s*\%\}/s,
        activityHtml || `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium text-gray-900">No tickets yet</p>
                <p class="text-sm text-gray-600">Create your first ticket to get started</p>
            </div>
            <span class="text-sm text-gray-500">Now</span>
        </div>`
    );

    res.send(template);
});

app.post('/api/logout', (req, res) => {
    res.redirect('/');
});

// API endpoints for tickets
app.get('/api/tickets', (req, res) => {
    res.json(tickets);
});

app.post('/api/tickets', (req, res) => {
    const newTicket = {
        id: (tickets.length + 1).toString(),
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority
    };
    tickets.push(newTicket);
    res.json(newTicket);
});

app.put('/api/tickets/:id', (req, res) => {
    const id = req.params.id;
    const index = tickets.findIndex(t => t.id === id);
    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...req.body };
        res.json(tickets[index]);
    } else {
        res.status(404).json({ error: 'Ticket not found' });
    }
});

app.delete('/api/tickets/:id', (req, res) => {
    const id = req.params.id;
    tickets = tickets.filter(t => t.id !== id);
    res.json({ success: true });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Available routes:');
    console.log('  / - Landing page');
    console.log('  /login - Login page');
    console.log('  /signup - Signup page');
    console.log('  /dashboard - Dashboard');
});
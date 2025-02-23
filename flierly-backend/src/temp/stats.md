Certainly! Here are additional statistics that can be added to the `User` entity using `isActive`, `createdAt`, `updatedAt`, and `deletedAt` fields, and how to visualize them using Chart.js.

### 1. Users Created, Updated, and Deleted Over Time

This chart shows the number of users created, updated, and deleted over time in a single chart.

#### Data Query

```typescript
const usersCreatedOverTime = await userRepository.createQueryBuilder('user')
    .select("DATE_TRUNC('month', user.createdAt)", 'month')
    .addSelect('COUNT(*)', 'count')
    .groupBy('month')
    .orderBy('month')
    .getRawMany();

const usersUpdatedOverTime = await userRepository.createQueryBuilder('user')
    .select("DATE_TRUNC('month', user.updatedAt)", 'month')
    .addSelect('COUNT(*)', 'count')
    .groupBy('month')
    .orderBy('month')
    .getRawMany();

const usersDeletedOverTime = await userRepository.createQueryBuilder('user')
    .select("DATE_TRUNC('month', user.deletedAt)", 'month')
    .addSelect('COUNT(*)', 'count')
    .where('user.deletedAt IS NOT NULL')
    .groupBy('month')
    .orderBy('month')
    .getRawMany();
```

#### Chart.js Configuration

```javascript
const ctx = document.getElementById('usersActivityOverTimeChart').getContext('2d');
const usersActivityOverTimeChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: usersCreatedOverTime.map(data => data.month),
        datasets: [
            {
                label: 'Users Created',
                data: usersCreatedOverTime.map(data => data.count),
                borderColor: '#36a2eb',
                fill: false,
            },
            {
                label: 'Users Updated',
                data: usersUpdatedOverTime.map(data => data.count),
                borderColor: '#ff6384',
                fill: false,
            },
            {
                label: 'Users Deleted',
                data: usersDeletedOverTime.map(data => data.count),
                borderColor: '#ff9f40',
                fill: false,
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Users Activity Over Time'
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    }
});
```

### 2. Active vs. Inactive Users

This chart shows the number of active and inactive users.

#### Data Query

```typescript
const totalUsersCount = await userRepository.count();
const activeUsersCount = await userRepository.count({ where: { isActive: true } });
const inactiveUsersCount = totalUsersCount - activeUsersCount;
```

#### Chart.js Configuration

```javascript
const ctx = document.getElementById('activeInactiveChart').getContext('2d');
const activeInactiveChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [{
            data: [activeUsersCount, inactiveUsersCount],
            backgroundColor: ['#36a2eb', '#ff6384'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Active vs. Inactive Users'
            }
        }
    }
});
```

### 3. Users Created, Updated, and Deleted in the Last 30 Days

This chart shows the number of users created, updated, and deleted in the last 30 days.

#### Data Query

```typescript
const usersCreatedLast30Days = await userRepository.createQueryBuilder('user')
    .select("DATE_TRUNC('day', user.createdAt)", 'day')
    .addSelect('COUNT(*)', 'count')
    .where('user.createdAt >= NOW() - INTERVAL \'30 days\'')
    .groupBy('day')
    .orderBy('day')
    .getRawMany();

const usersUpdatedLast30Days = await userRepository.createQueryBuilder('user')
    .select("DATE_TRUNC('day', user.updatedAt)", 'day')
    .addSelect('COUNT(*)', 'count')
    .where('user.updatedAt >= NOW() - INTERVAL \'30 days\'')
    .groupBy('day')
    .orderBy('day')
    .getRawMany();

const usersDeletedLast30Days = await userRepository.createQueryBuilder('user')
    .select("DATE_TRUNC('day', user.deletedAt)", 'day')
    .addSelect('COUNT(*)', 'count')
    .where('user.deletedAt IS NOT NULL AND user.deletedAt >= NOW() - INTERVAL \'30 days\'')
    .groupBy('day')
    .orderBy('day')
    .getRawMany();
```

#### Chart.js Configuration

```javascript
const ctx = document.getElementById('usersActivityLast30DaysChart').getContext('2d');
const usersActivityLast30DaysChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: usersCreatedLast30Days.map(data => data.day),
        datasets: [
            {
                label: 'Users Created',
                data: usersCreatedLast30Days.map(data => data.count),
                backgroundColor: '#36a2eb',
            },
            {
                label: 'Users Updated',
                data: usersUpdatedLast30Days.map(data => data.count),
                backgroundColor: '#ff6384',
            },
            {
                label: 'Users Deleted',
                data: usersDeletedLast30Days.map(data => data.count),
                backgroundColor: '#ff9f40',
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Users Activity in the Last 30 Days'
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    }
});
```

### Example HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Statistics</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div>
        <canvas id="usersActivityOverTimeChart"></canvas>
    </div>
    <div>
        <canvas id="activeInactiveChart"></canvas>
    </div>
    <div>
        <canvas id="usersActivityLast30DaysChart"></canvas>
    </div>
    <script>
        // Insert the Chart.js configurations here
    </script>
</body>
</html>
```

With these configurations, you can visualize the statistics for the `User` entity using Chart.js. The combined chart shows users created, deleted, and updated over time, while the pie chart shows the active vs. inactive users. Additionally, the bar chart shows users created, updated, and deleted in the last 30 days.

Similar code found with 2 license types
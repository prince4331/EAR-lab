/**
 * Database Seeding Script
 * Populates the database with initial data for development and testing
 * 
 * Usage: node --require tsx/register scripts/seed.ts
 * Or: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

/**
 * Hash password for users
 */
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Main seed function
 */
async function main() {
  console.log('🌱 Starting database seeding...\n');

  // ============================================================================
  // Seed Users
  // ============================================================================
  console.log('👤 Seeding users...');
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@earlab.tech' },
    update: {},
    create: {
      email: 'admin@earlab.tech',
      name: 'Admin User',
      role: 'admin',
      hashedPassword: hashPassword('admin123'), // Change in production!
    },
  });

  const authorUser = await prisma.user.upsert({
    where: { email: 'author@earlab.tech' },
    update: {},
    create: {
      email: 'author@earlab.tech',
      name: 'Dr. Sarah Chen',
      role: 'user',
      hashedPassword: hashPassword('author123'),
    },
  });

  console.log('✅ Created 2 users\n');

  // ============================================================================
  // Seed Blog Posts
  // ============================================================================
  console.log('📝 Seeding blog posts...');

  const blogPosts = [
    {
      title: 'How to Architect a Modular Autonomy Stack for Warehouse Robots',
      slug: 'modular-autonomy-stack-warehouse-robots',
      excerpt: 'Learn about designing scalable, modular autonomy systems with practical examples and architecture patterns for warehouse automation.',
      contentMarkdown: `# How to Architect a Modular Autonomy Stack for Warehouse Robots

## Introduction

Warehouse automation is rapidly evolving, with autonomous mobile robots (AMRs) becoming increasingly sophisticated. This article explores the architectural principles behind building modular autonomy stacks that can scale from proof-of-concept to production deployments.

## Core Components

### 1. Perception Layer
The perception layer handles sensor data processing and environmental understanding:

- **LiDAR Processing**: Point cloud filtering and obstacle detection
- **Camera Vision**: Object recognition and barcode reading
- **Sensor Fusion**: Combining multiple sensor streams for robust perception

### 2. Localization & Mapping
Accurate localization is critical for warehouse operations:

\`\`\`python
class LocalizationModule:
    def __init__(self, map_data):
        self.map = map_data
        self.particle_filter = ParticleFilter()
    
    def update(self, sensor_data, odometry):
        # Update robot position estimate
        self.particle_filter.update(sensor_data)
        return self.particle_filter.get_position()
\`\`\`

### 3. Path Planning
Efficient path planning optimizes warehouse operations:

- **Global Planning**: A* or Dijkstra for optimal routes
- **Local Planning**: Dynamic Window Approach for obstacle avoidance
- **Multi-robot Coordination**: Traffic management and deadlock prevention

### 4. Control Layer
Low-level control ensures smooth execution:

\`\`\`python
def pid_controller(setpoint, measurement, kp, ki, kd):
    error = setpoint - measurement
    integral += error * dt
    derivative = (error - previous_error) / dt
    output = kp * error + ki * integral + kd * derivative
    return output
\`\`\`

## Architecture Patterns

### Microservices Architecture
Each autonomy component runs as an independent service:

\`\`\`yaml
services:
  perception:
    image: earlab/perception:latest
    ports: [8001:8001]
  
  localization:
    image: earlab/localization:latest
    ports: [8002:8002]
  
  planning:
    image: earlab/planning:latest
    ports: [8003:8003]
\`\`\`

### Message-Based Communication
Use ROS2 or similar pub/sub systems for inter-module communication.

## Best Practices

1. **Modularity**: Keep components loosely coupled
2. **Testing**: Implement comprehensive unit and integration tests
3. **Simulation**: Use Gazebo or similar for development
4. **Monitoring**: Track performance metrics in real-time
5. **Fault Tolerance**: Handle sensor failures gracefully

## Conclusion

Building modular autonomy stacks requires careful architectural design. By following these principles, you can create systems that are maintainable, scalable, and production-ready.

## Further Reading

- ROS2 Design Patterns
- Probabilistic Robotics by Thrun et al.
- Modern Robotics by Lynch & Park`,
      tags: JSON.stringify(['Autonomy', 'Robotics', 'Architecture', 'Warehouse']),
      status: 'published',
      readingTime: 12,
      featuredImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200',
      publishedAt: new Date('2024-10-15'),
      authorId: authorUser.id,
    },
    {
      title: 'Choosing the Right Battery Monitoring Approach for Mobile Robots',
      slug: 'battery-monitoring-mobile-robots',
      excerpt: 'A comprehensive guide to battery management systems for autonomous robots, covering voltage monitoring, state-of-charge estimation, and safety considerations.',
      contentMarkdown: `# Choosing the Right Battery Monitoring Approach for Mobile Robots

## Why Battery Monitoring Matters

Battery management is critical for mobile robot operations. Poor monitoring can lead to:

- Unexpected shutdowns during missions
- Reduced battery lifespan
- Safety hazards
- Inefficient fleet management

## Battery Monitoring Techniques

### 1. Voltage-Based Monitoring

The simplest approach measures battery voltage:

\`\`\`c
float read_battery_voltage() {
    int adc_value = analogRead(BATTERY_PIN);
    return (adc_value / 1023.0) * VREF * VOLTAGE_DIVIDER_RATIO;
}

float estimate_soc(float voltage) {
    // Simple linear approximation
    return ((voltage - V_MIN) / (V_MAX - V_MIN)) * 100.0;
}
\`\`\`

**Pros**: Simple, low cost
**Cons**: Inaccurate under load, doesn't account for battery aging

### 2. Coulomb Counting

Integrates current over time to track charge:

\`\`\`c
float soc = 100.0; // Start at 100%
float capacity_mah = 5000.0;

void update_soc(float current_ma, float dt_hours) {
    float charge_change = current_ma * dt_hours;
    soc -= (charge_change / capacity_mah) * 100.0;
    soc = constrain(soc, 0.0, 100.0);
}
\`\`\`

**Pros**: More accurate than voltage-only
**Cons**: Drift over time, requires calibration

### 3. Advanced BMS with State Estimation

Modern systems use Kalman filters or neural networks:

\`\`\`python
class AdvancedBMS:
    def __init__(self):
        self.ekf = ExtendedKalmanFilter()
        self.model = BatteryModel()
    
    def estimate_soc(self, voltage, current, temperature):
        # Extended Kalman Filter for SOC estimation
        measurement = np.array([voltage, current])
        self.ekf.predict(self.model, temperature)
        self.ekf.update(measurement)
        return self.ekf.state[0]  # SOC estimate
\`\`\`

## Hardware Considerations

### Current Sensing
- **Hall Effect Sensors**: Isolated, bi-directional
- **Shunt Resistors**: Low cost, accurate
- **INA226 IC**: Integrated voltage and current sensing

### Temperature Monitoring
Place thermistors at:
- Battery pack center
- High-current terminals
- Power electronics

### Protection Circuits
Essential safety features:
- Overvoltage protection
- Undervoltage cutoff
- Overcurrent limiting
- Short circuit protection
- Thermal shutdown

## Software Architecture

\`\`\`yaml
Battery Management System:
  Hardware Layer:
    - Voltage ADC
    - Current Sensor (INA226)
    - Temperature Sensors (NTC)
  
  Estimation Layer:
    - SOC Estimator (Kalman Filter)
    - SOH Monitor
    - RUL Predictor
  
  Safety Layer:
    - Fault Detection
    - Protection Logic
    - Emergency Shutdown
  
  Communication Layer:
    - CAN Bus Interface
    - ROS2 Publisher
    - Web Dashboard
\`\`\`

## Fleet Management Integration

For multi-robot systems:

\`\`\`python
class FleetBatteryManager:
    def optimize_charging(self, robots):
        # Prioritize robots with upcoming missions
        for robot in sorted(robots, key=lambda r: r.next_mission_time):
            if robot.soc < 30:
                self.send_to_charging(robot)
    
    def predict_mission_feasibility(self, robot, mission):
        estimated_consumption = self.estimate_consumption(mission)
        return robot.soc > estimated_consumption + SAFETY_MARGIN
\`\`\`

## Recommendations by Robot Type

| Robot Type | Recommended Approach | Key Considerations |
|------------|---------------------|-------------------|
| Small AGV (<50kg) | Voltage + Coulomb Counting | Cost-effective, adequate accuracy |
| Warehouse AMR | Advanced BMS with SOC/SOH | Mission-critical operations |
| Outdoor Robot | BMS + Temperature Compensation | Extreme temperature variations |
| Collaborative Robot | Safety-certified BMS | Human safety requirements |

## Conclusion

Selecting the right battery monitoring approach depends on your robot's application, budget, and reliability requirements. For mission-critical applications, invest in advanced BMS solutions with state estimation and comprehensive safety features.

## Resources

- [Texas Instruments Battery Management Guide](https://www.ti.com)
- [Linear Technology BMS ICs](https://www.analog.com)
- IEEE Battery Management Standards`,
      tags: JSON.stringify(['Battery', 'Power', 'Electronics', 'Embedded']),
      status: 'published',
      readingTime: 10,
      featuredImage: 'https://images.unsplash.com/photo-1609860661568-56e431aba7fc?w=1200',
      publishedAt: new Date('2024-11-01'),
      authorId: authorUser.id,
    },
    {
      title: 'Open-Source Sensor Fusion Libraries Compared',
      slug: 'sensor-fusion-libraries-comparison',
      excerpt: 'An in-depth comparison of popular sensor fusion libraries including Robot Localization, Kalman Filter implementations, and custom solutions.',
      contentMarkdown: `# Open-Source Sensor Fusion Libraries Compared

## Why Sensor Fusion?

Modern robots use multiple sensors (IMU, GPS, wheel encoders, cameras) that must be fused for accurate state estimation. This article compares popular open-source libraries.

## Libraries Compared

### 1. Robot Localization (ROS)

\`\`\`yaml
ekf_filter_node:
  frequency: 30
  sensor_timeout: 0.1
  odom0: /wheel_odometry
  imu0: /imu/data
  
  odom0_config: [true, true, false, ...]
  imu0_config: [false, false, false, ...]
\`\`\`

**Pros**: 
- Easy ROS integration
- Well-documented
- Supports EKF and UKF

**Cons**: 
- ROS dependency
- Limited customization

### 2. FilterPy (Python)

\`\`\`python
from filterpy.kalman import ExtendedKalmanFilter

class RobotEKF:
    def __init__(self):
        self.ekf = ExtendedKalmanFilter(dim_x=5, dim_z=3)
        self.ekf.x = np.array([0., 0., 0., 0., 0.])
        self.ekf.P *= 1000
    
    def predict(self, dt, control):
        self.ekf.predict(u=control, dt=dt)
    
    def update(self, measurement):
        self.ekf.update(measurement, HJacobian, Hx)
\`\`\`

**Pros**: 
- Pure Python
- Flexible
- Good for prototyping

**Cons**: 
- Slower than C++
- Manual Jacobian definition

### 3. GTSAM (Georgia Tech Smoothing and Mapping)

High-performance factor graph optimization:

\`\`\`cpp
#include <gtsam/slam/BetweenFactor.h>
#include <gtsam/nonlinear/LevenbergMarquardtOptimizer.h>

NonlinearFactorGraph graph;
Values initial;

// Add factors
graph.add(PriorFactor<Pose2>(0, priorMean, priorNoise));
graph.add(BetweenFactor<Pose2>(0, 1, odometry, odometryNoise));

// Optimize
LevenbergMarquardtOptimizer optimizer(graph, initial);
Values result = optimizer.optimize();
\`\`\`

**Pros**: 
- High performance
- Handles complex factor graphs
- Battle-tested (SLAM)

**Cons**: 
- Steeper learning curve
- C++ only

### 4. Kalibr (Calibration)

Specializes in sensor calibration:

\`\`\`bash
kalibr_calibrate_imu_camera \\
  --bag recording.bag \\
  --cam camchain.yaml \\
  --imu imu.yaml \\
  --target target.yaml
\`\`\`

## Performance Benchmark

| Library | Processing Time (ms) | Accuracy (RMSE) | Ease of Use |
|---------|---------------------|-----------------|-------------|
| Robot Localization | 5-10 | 0.15m | ⭐⭐⭐⭐⭐ |
| FilterPy | 10-20 | 0.20m | ⭐⭐⭐⭐ |
| GTSAM | 2-5 | 0.10m | ⭐⭐⭐ |
| Custom EKF | 1-3 | 0.12m | ⭐⭐ |

## Recommendations

**For ROS Projects**: Use `robot_localization`
**For Research**: Use `GTSAM` or `FilterPy`
**For Embedded**: Write custom lightweight EKF
**For Learning**: Start with `FilterPy`

## Implementation Example

Complete EKF implementation for robot localization:

\`\`\`python
import numpy as np
from filterpy.kalman import ExtendedKalmanFilter

class RobotEKF:
    def __init__(self):
        # State: [x, y, theta, v, omega]
        self.ekf = ExtendedKalmanFilter(dim_x=5, dim_z=3)
        
        # Initialize state
        self.ekf.x = np.zeros(5)
        
        # Process noise
        self.ekf.Q = np.diag([0.1, 0.1, 0.1, 0.5, 0.5])
        
        # Measurement noise
        self.ekf.R = np.diag([0.5, 0.5, 0.2])
    
    def predict(self, dt, v, omega):
        """Predict step with velocity control"""
        x, y, theta, _, _ = self.ekf.x
        
        # State transition
        self.ekf.x[0] += v * np.cos(theta) * dt
        self.ekf.x[1] += v * np.sin(theta) * dt
        self.ekf.x[2] += omega * dt
        self.ekf.x[3] = v
        self.ekf.x[4] = omega
        
        # Jacobian F
        F = np.eye(5)
        F[0, 2] = -v * np.sin(theta) * dt
        F[1, 2] = v * np.cos(theta) * dt
        
        # Predict covariance
        self.ekf.P = F @ self.ekf.P @ F.T + self.ekf.Q
    
    def update(self, gps_x, gps_y, heading):
        """Update with GPS and compass"""
        z = np.array([gps_x, gps_y, heading])
        H = np.array([
            [1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0]
        ])
        
        # Innovation
        y = z - H @ self.ekf.x
        S = H @ self.ekf.P @ H.T + self.ekf.R
        
        # Kalman gain
        K = self.ekf.P @ H.T @ np.linalg.inv(S)
        
        # Update state and covariance
        self.ekf.x += K @ y
        self.ekf.P = (np.eye(5) - K @ H) @ self.ekf.P
\`\`\`

## Conclusion

Choose your sensor fusion library based on your project requirements. For most robotics applications, `robot_localization` or `GTSAM` provide the best balance of performance and ease of use.`,
      tags: JSON.stringify(['Sensors', 'Fusion', 'Algorithms', 'Comparison']),
      status: 'published',
      readingTime: 15,
      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
      publishedAt: new Date('2024-11-15'),
      authorId: authorUser.id,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`✅ Created ${blogPosts.length} blog posts\n`);

  // ============================================================================
  // Seed Projects
  // ============================================================================
  console.log('🚀 Seeding projects...');

  const projects = [
    {
      title: 'Autonomous Warehouse AMR Fleet',
      slug: 'autonomous-warehouse-amr-fleet',
      summary: 'Complete autonomy stack for a fleet of 20 warehouse robots handling inventory management and order fulfillment.',
      contentMarkdown: `# Autonomous Warehouse AMR Fleet

## Project Overview

Developed a complete autonomous mobile robot (AMR) system for warehouse operations, including fleet management, path planning, and collision avoidance for 20 robots.

## Client Challenge

A major e-commerce logistics company needed to automate their 50,000 sq ft warehouse to handle increased order volume while reducing operational costs.

## Solution Architecture

### Hardware Platform
- Custom AMR chassis with differential drive
- 2D LiDAR (SICK LMS1xx) for navigation
- RGB-D cameras for barcode scanning
- Embedded controller (NVIDIA Jetson Xavier)

### Software Stack
- ROS2 for robot control
- Custom fleet management system
- SLAM for dynamic environment mapping
- Multi-robot path planning with deadlock prevention

### Key Features
1. **Autonomous Navigation**: Dynamic obstacle avoidance in busy warehouse
2. **Fleet Coordination**: Centralized task assignment and traffic management
3. **Real-time Monitoring**: Web dashboard for operations team
4. **Safety Systems**: Emergency stop, collision prevention, human detection

## Technical Implementation

\`\`\`python
class FleetManager:
    def __init__(self, num_robots=20):
        self.robots = [Robot(i) for i in range(num_robots)]
        self.task_queue = PriorityQueue()
        self.map = WarehouseMap()
    
    def assign_tasks(self):
        while not self.task_queue.empty():
            task = self.task_queue.get()
            robot = self.find_nearest_available_robot(task.location)
            robot.assign_task(task)
    
    def coordinate_paths(self):
        # Multi-agent path finding
        paths = self.mapf_solver.solve(
            [r.current_pos for r in self.robots],
            [r.goal_pos for r in self.robots]
        )
        return paths
\`\`\`

## Results & Impact

- **50% reduction** in order fulfillment time
- **99.8% uptime** across the fleet
- **Zero collisions** in 6 months of operation
- **ROI achieved** in 18 months

## Technologies Used

- ROS2, Python, C++
- SLAM, Probabilistic Robotics
- PostgreSQL, Redis
- Docker, Kubernetes

## Client Testimonial

> "EAR Lab delivered a robust, production-ready system that exceeded our expectations. Their autonomy stack is handling over 1,000 orders per day with remarkable reliability."
> 
> — Operations Director, LogiTech Solutions

## Timeline

- **Phase 1 (3 months)**: System design and prototyping
- **Phase 2 (4 months)**: Development and testing
- **Phase 3 (2 months)**: Deployment and optimization
- **Phase 4 (ongoing)**: Maintenance and upgrades`,
      techTags: JSON.stringify(['ROS2', 'Python', 'SLAM', 'Fleet Management', 'LiDAR']),
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-03-01'),
      clientName: 'LogiTech Solutions',
      isPublic: true,
      category: 'autonomy',
    },
    {
      title: 'Smart Battery Management System for EV Fleet',
      slug: 'smart-battery-management-ev-fleet',
      summary: 'Advanced BMS with state-of-charge and state-of-health estimation for electric vehicle fleet optimization.',
      contentMarkdown: `# Smart Battery Management System for EV Fleet

## Overview

Developed an intelligent battery management system for a commercial EV fleet, providing accurate SOC/SOH estimation and predictive maintenance.

## Technical Approach

### Hardware Design
- Custom PCB with STM32F4 microcontroller
- INA226 current sensors (50A range)
- 8-channel temperature monitoring
- CAN bus communication

### Algorithms
- Extended Kalman Filter for SOC estimation
- Neural network for SOH prediction
- Adaptive capacity tracking

### Safety Features
- Overcurrent protection
- Thermal management
- Cell balancing
- Emergency shutdown

## Results

- 95% SOC accuracy
- 30% improvement in battery lifespan
- Predictive maintenance alerts

## Tech Stack

C, Python, TensorFlow, CAN Protocol`,
      techTags: JSON.stringify(['Embedded', 'Battery', 'Kalman Filter', 'STM32', 'CAN']),
      featuredImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-02-01'),
      clientName: 'GreenFleet Logistics',
      isPublic: true,
      category: 'power',
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log(`✅ Created ${projects.length} projects\n`);

  // ============================================================================
  // Seed Workshops
  // ============================================================================
  console.log('🎓 Seeding workshops...');

  const workshops = [
    {
      name: 'ROS2 Fundamentals Bootcamp',
      description: 'Comprehensive 3-day bootcamp covering ROS2 basics, navigation stack, and practical robot development.',
      syllabus: `Day 1: ROS2 Basics, Nodes, Topics, Services
Day 2: Navigation Stack, SLAM, Path Planning
Day 3: Hands-on Robot Project`,
      price: 1200,
      dates: JSON.stringify([
        new Date('2025-01-15').toISOString(),
        new Date('2025-01-16').toISOString(),
        new Date('2025-01-17').toISOString(),
      ]),
      maxAttendees: 20,
      isPublic: true,
    },
    {
      name: 'Embedded Systems for Robotics',
      description: '2-week intensive course on embedded programming, real-time systems, and hardware integration for robots.',
      syllabus: `Week 1: ARM Cortex-M Programming, RTOS, Peripherals
Week 2: Sensor Integration, Motor Control, Communication Protocols`,
      price: 2500,
      dates: JSON.stringify([
        new Date('2025-02-01').toISOString(),
        new Date('2025-02-14').toISOString(),
      ]),
      maxAttendees: 15,
      isPublic: true,
    },
  ];

  for (const workshop of workshops) {
    await prisma.workshop.create({
      data: workshop,
    });
  }

  console.log(`✅ Created ${workshops.length} workshops\n`);

  // ============================================================================
  // Seed Newsletter Subscribers (Test Data)
  // ============================================================================
  console.log('📧 Seeding newsletter subscribers...');

  const subscribers = [
    {
      email: 'subscriber1@example.com',
      name: 'John Doe',
      role: 'Engineer',
      company: 'Tech Corp',
      isVerified: true,
      source: 'website',
    },
    {
      email: 'subscriber2@example.com',
      name: 'Jane Smith',
      role: 'Researcher',
      company: 'University Lab',
      isVerified: true,
      source: 'website',
    },
  ];

  for (const subscriber of subscribers) {
    await prisma.newsletterSubscriber.upsert({
      where: { email: subscriber.email },
      update: {},
      create: subscriber,
    });
  }

  console.log(`✅ Created ${subscribers.length} newsletter subscribers\n`);

  // ============================================================================
  // Summary
  // ============================================================================
  console.log('🎉 Database seeding completed successfully!\n');
  console.log('Summary:');
  console.log(`- Users: 2`);
  console.log(`- Blog Posts: ${blogPosts.length}`);
  console.log(`- Projects: ${projects.length}`);
  console.log(`- Workshops: ${workshops.length}`);
  console.log(`- Newsletter Subscribers: ${subscribers.length}\n`);

  console.log('🔐 Default Admin Credentials:');
  console.log('Email: admin@earlab.tech');
  console.log('Password: admin123');
  console.log('⚠️  CHANGE THIS PASSWORD IN PRODUCTION!\n');
}

/**
 * Execute seed function
 */
main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

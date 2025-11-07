'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ArrowRight, Calendar, ExternalLink, Search, Filter as FilterIcon } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'Autonomous Warehouse Robot',
    summary: 'Developed a complete autonomous navigation system for warehouse logistics robots using LiDAR and computer vision. The system achieved 99.8% navigation accuracy in complex warehouse environments.',
    contentMarkdown: `# Autonomous Warehouse Robot

## Problem Statement
LogiTech Solutions needed an autonomous navigation system for their warehouse robots that could operate reliably in dynamic environments with moving obstacles and changing layouts.

## Solution Architecture
We implemented a multi-layered autonomy stack:
- **Perception Layer**: Fusion of LiDAR, RGB-D cameras, and IMU data
- **Localization Layer**: Adaptive Monte Carlo Localization with dynamic map updates
- **Planning Layer**: Hierarchical path planning with real-time obstacle avoidance
- **Control Layer**: Model predictive control for smooth trajectory execution

## Technical Implementation
- **Framework**: ROS2 with custom C++ nodes
- **Algorithms**: A* for global planning, DWA for local planning
- **Sensors**: Velodyne VLP-16 LiDAR, Intel RealSense D435
- **Compute**: NVIDIA Jetson AGX Xavier for edge processing

## Key Features
- Real-time 3D mapping and localization
- Dynamic obstacle detection and avoidance
- Fleet management and coordination
- Cloud-based monitoring and analytics

## Results & KPIs
- Navigation accuracy: 99.8%
- Average mission completion time: 12 minutes (35% improvement)
- System uptime: 99.5%
- ROI achieved within 8 months

## Client Testimonial
"The autonomous system developed by EAR Lab transformed our warehouse operations. We've seen a 40% increase in throughput and significantly reduced operational costs." - CTO, LogiTech Solutions`,
    techTags: ['ROS2', 'LiDAR', 'Computer Vision', 'Path Planning', 'C++', 'NVIDIA Jetson'],
    category: 'autonomy',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    clientName: 'LogiTech Solutions',
    featuredImage: '/projects/warehouse-robot.jpg',
    slug: 'autonomous-warehouse-robot',
    outcomes: {
      accuracy: '99.8%',
      efficiency: '+35%',
      uptime: '99.5%',
      roi: '8 months'
    }
  },
  {
    id: 2,
    title: 'Smart Battery Management System',
    summary: 'Designed and implemented an intelligent BMS for electric vehicle applications with predictive health monitoring. The system extended battery life by 25% through advanced algorithms.',
    contentMarkdown: `# Smart Battery Management System

## Problem Statement
EV Motors Inc needed a sophisticated battery management system that could provide accurate state-of-charge estimation, predict battery health, and optimize charging strategies for their electric vehicle fleet.

## Solution Architecture
We developed a multi-tiered BMS architecture:
- **Hardware Layer**: Custom PCB with high-precision sensing
- **Firmware Layer**: Real-time monitoring and safety protocols
- **Algorithm Layer**: Machine learning-based health prediction
- **Cloud Layer**: Fleet analytics and over-the-air updates

## Technical Implementation
- **Hardware**: Custom STM32-based PCB with 16-cell monitoring
- **Communication**: CAN bus and cellular connectivity
- **Algorithms**: Extended Kalman Filter for SoC estimation, LSTM for health prediction
- **Safety**: ASIL-C compliant safety mechanisms

## Key Features
- Real-time cell balancing and health monitoring
- Predictive maintenance alerts
- Adaptive charging profiles
- Fleet-wide analytics dashboard

## Results & KPIs
- Battery life extension: 25%
- Charging efficiency: 95%
- System reliability: 99.9%
- Maintenance cost reduction: 40%

## Client Testimonial
"The smart BMS from EAR Lab has revolutionized our battery management. We're seeing significant improvements in battery life and reduced maintenance costs." - VP Engineering, EV Motors Inc`,
    techTags: ['Embedded C', 'CAN Bus', 'Machine Learning', 'IoT', 'STM32', 'Battery'],
    category: 'power',
    startDate: '2023-11-01',
    endDate: '2024-02-15',
    clientName: 'EV Motors Inc',
    featuredImage: '/projects/battery-management.jpg',
    slug: 'smart-battery-management',
    outcomes: {
      batteryLife: '+25%',
      chargingEfficiency: '95%',
      reliability: '99.9%',
      maintenanceCost: '-40%'
    }
  },
  {
    id: 3,
    title: 'Multi-Sensor Fusion Platform',
    summary: 'Created a sensor fusion framework combining IMU, GPS, and vision data for robust drone localization. Achieved centimeter-level accuracy in GPS-denied environments.',
    contentMarkdown: `# Multi-Sensor Fusion Platform

## Problem Statement
AeroDynamics required a robust localization system for their drones that could maintain accurate positioning even in GPS-denied environments like urban canyons and indoor spaces.

## Solution Architecture
We implemented a comprehensive sensor fusion framework:
- **Sensor Suite**: IMU, GPS, Magnetometer, Barometer, Monocular Camera
- **Fusion Algorithm**: Extended Kalman Filter with visual-inertial odometry
- **Failure Detection**: Real-time sensor fault detection and isolation
- **Fallback Modes**: Multiple operating modes for different environments

## Technical Implementation
- **Framework**: ROS2 with Python and C++ nodes
- **Algorithms**: EKF for sensor fusion, VINS-Mono for visual odometry
- **Hardware**: Custom sensor integration board
- **Testing**: Extensive simulation and real-world validation

## Key Features
- Centimeter-level positioning accuracy
- Real-time sensor health monitoring
- Automatic mode switching
- Extensible architecture for new sensors

## Results & KPIs
- Positioning accuracy: 5cm (GPS), 10cm (GPS-denied)
- Update rate: 100Hz
- System availability: 99.7%
- Development time: 6 months ahead of schedule

## Client Testimonial
"The sensor fusion platform exceeded our expectations. The accuracy in GPS-denied environments is remarkable and has opened up new application possibilities." - CTO, AeroDynamics`,
    techTags: ['Sensor Fusion', 'Kalman Filter', 'Real-time Systems', 'Python', 'ROS2', 'Computer Vision'],
    category: 'sensors',
    startDate: '2023-09-15',
    endDate: '2023-12-20',
    clientName: 'AeroDynamics',
    featuredImage: '/projects/sensor-fusion.jpg',
    slug: 'multi-sensor-fusion',
    outcomes: {
      accuracy: '5cm',
      updateRate: '100Hz',
      availability: '99.7%',
      developmentTime: '6 months ahead'
    }
  },
  {
    id: 4,
    title: 'Real-time Controller for Robotic Arm',
    summary: 'Developed a high-performance real-time controller for industrial robotic arms with sub-millisecond latency and advanced trajectory planning.',
    contentMarkdown: `# Real-time Controller for Robotic Arm

## Problem Statement
Manufacturing client needed a real-time controller for their 6-DOF robotic arms that could provide precise motion control with minimal latency for high-speed pick-and-place operations.

## Solution Architecture
We designed a multi-layered control system:
- **Hardware Layer**: FPGA-based real-time processing
- **Control Layer**: PID with feedforward compensation
- **Planning Layer**: Trajectory optimization with collision avoidance
- **Interface Layer**: User-friendly programming interface

## Technical Implementation
- **Hardware**: Xilinx Zynq UltraScale+ MPSoC
- **Real-time OS**: FreeRTOS with priority-based scheduling
- **Control Algorithms**: Computed torque control with adaptive gains
- **Communication**: EtherCAT for industrial integration

## Key Features
- Sub-millisecond control loop latency
- Advanced trajectory planning
- Real-time collision detection
- Easy programming interface

## Results & KPIs
- Control latency: 0.8ms
- Positioning accuracy: ±0.1mm
- Throughput increase: 45%
- System reliability: 99.95%

## Client Testimonial
"The real-time controller has significantly improved our manufacturing efficiency. The precision and speed are exactly what we needed for our high-volume operations."`,
    techTags: ['Real-time Systems', 'FPGA', 'Control Theory', 'C++', 'EtherCAT', 'Robotics'],
    category: 'embedded',
    startDate: '2023-07-01',
    endDate: '2023-10-15',
    clientName: 'Precision Manufacturing Co',
    featuredImage: '/projects/robotic-arm-controller.jpg',
    slug: 'realtime-robotic-controller',
    outcomes: {
      latency: '0.8ms',
      accuracy: '±0.1mm',
      throughput: '+45%',
      reliability: '99.95%'
    }
  },
  {
    id: 5,
    title: 'AI-Powered Quality Inspection System',
    summary: 'Built an automated quality inspection system using computer vision and deep learning for manufacturing defect detection with 99.5% accuracy.',
    contentMarkdown: `# AI-Powered Quality Inspection System

## Problem Statement
Manufacturing client needed an automated quality inspection system that could detect defects in their products with high accuracy and speed to reduce manual inspection costs.

## Solution Architecture
We developed a comprehensive inspection system:
- **Vision System**: High-resolution cameras with specialized lighting
- **AI Layer**: Deep learning models for defect detection
- **Control Layer**: Automated product handling and sorting
- **Analytics Layer**: Real-time defect analysis and reporting

## Technical Implementation
- **Hardware**: Industrial cameras with custom lighting rigs
- **AI Framework**: PyTorch with custom CNN architectures
- **Edge Computing**: NVIDIA Jetson for real-time inference
- **Integration**: PLC integration for manufacturing line control

## Key Features
- Real-time defect detection
- Automated product sorting
- Detailed analytics dashboard
- Continuous model improvement

## Results & KPIs
- Detection accuracy: 99.5%
- Inspection speed: 500 units/hour
- Defect reduction: 60%
- ROI: 7 months

## Client Testimonial
"The AI inspection system has transformed our quality control process. We've seen dramatic improvements in both accuracy and efficiency."`,
    techTags: ['Computer Vision', 'Deep Learning', 'PyTorch', 'NVIDIA Jetson', 'Manufacturing', 'Quality Control'],
    category: 'autonomy',
    startDate: '2023-05-15',
    endDate: '2023-08-30',
    clientName: 'Quality Manufacturing Inc',
    featuredImage: '/projects/ai-inspection.jpg',
    slug: 'ai-quality-inspection',
    outcomes: {
      accuracy: '99.5%',
      speed: '500 units/hour',
      defectReduction: '-60%',
      roi: '7 months'
    }
  },
  {
    id: 6,
    title: 'Fleet Management System for Delivery Drones',
    summary: 'Created a comprehensive fleet management system for delivery drones with route optimization, weather integration, and real-time monitoring.',
    contentMarkdown: `# Fleet Management System for Delivery Drones

## Problem Statement
Delivery company needed a scalable fleet management system to coordinate hundreds of delivery drones efficiently while ensuring safety and regulatory compliance.

## Solution Architecture
We built a multi-tiered fleet management platform:
- **Ground Control**: Real-time monitoring and control interface
- **Route Planning**: AI-powered route optimization
- **Safety Systems**: Weather integration and conflict resolution
- **Analytics**: Performance metrics and predictive maintenance

## Technical Implementation
- **Backend**: Microservices architecture with Kubernetes
- **Frontend**: React-based dashboard with real-time updates
- **Algorithms**: Genetic algorithms for route optimization
- **Communication**: 4G/5G connectivity with fallback systems

## Key Features
- Real-time fleet monitoring
- Dynamic route optimization
- Weather-aware flight planning
- Automated conflict resolution
- Predictive maintenance alerts

## Results & KPIs
- Fleet efficiency: 35% improvement
- Delivery time: 25% reduction
- Safety incidents: 90% reduction
- Operational cost: 30% reduction

## Client Testimonial
"The fleet management system has revolutionized our drone delivery operations. We're seeing significant improvements in efficiency and safety."`,
    techTags: ['Fleet Management', 'Route Optimization', 'React', 'Kubernetes', 'Microservices', 'Drones'],
    category: 'autonomy',
    startDate: '2023-03-01',
    endDate: '2023-06-30',
    clientName: 'SwiftDelivery Logistics',
    featuredImage: '/projects/drone-fleet-management.jpg',
    slug: 'drone-fleet-management',
    outcomes: {
      efficiency: '+35%',
      deliveryTime: '-25%',
      safetyIncidents: '-90%',
      operationalCost: '-30%'
    }
  }
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'embedded', label: 'Embedded Systems' },
  { value: 'autonomy', label: 'Autonomy & AI' },
  { value: 'sensors', label: 'Sensor Integration' },
  { value: 'power', label: 'Power Systems' }
]

const getCategoryColor = (category: string) => {
  const colors = {
    autonomy: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    embedded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    sensors: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    power: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
  }
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
}

export function ProjectsGrid() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FilterIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Project Image */}
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">Case Study</p>
                  </div>
                </div>
                <Badge 
                  className={`absolute top-4 left-4 ${getCategoryColor(project.category)}`}
                  variant="secondary"
                >
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {project.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.techTags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.techTags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techTags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Project Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(project.startDate).getFullYear()}</span>
                  </div>
                  <span className="text-xs">{project.clientName}</span>
                </div>

                {/* Key Outcomes */}
                {project.outcomes && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(project.outcomes).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded p-2 text-center">
                        <div className="font-semibold text-primary">{value}</div>
                        <div className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary group-hover:text-primary/80 w-full" asChild>
                  <Link href={`/projects/${project.slug}`}>
                    View Full Case Study
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filter
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
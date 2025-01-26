import React from "react";
import { Card, Button } from "antd";
import { motion } from "motion/react";
import { AppstoreOutlined, VideoCameraOutlined } from "@ant-design/icons";
import "./AppsPage.css"; // Include your custom CSS file

const AppsPage: React.FC = () => {
    const apps = [
        {
            name: "ERP Application",
            description: "Manage inventory, finances, and business operations.",
            icon: <AppstoreOutlined style={{ fontSize: "2rem", color: "#2196F3" }} />,
            link: "/erp",
        },
        {
            name: "Movie Library",
            description: "Browse and organize your favorite movies.",
            icon: <VideoCameraOutlined style={{ fontSize: "2rem", color: "#2196F3" }} />,
            link: "/movies",
        },
    ];

    return (
        <div className="landing-page">
            <motion.h1
                className="landing-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Welcome to the Multi-App Platform
            </motion.h1>
            <div className="app-grid">
                {apps.map((app, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        <Card
                            hoverable
                            className="app-card"
                            cover={
                                <div className="app-icon-container">
                                    {app.icon}
                                </div>
                            }
                        >
                            <Card.Meta
                                title={<span className="app-title">{app.name}</span>}
                                description={<p className="app-description">{app.description}</p>}
                            />
                            <div className="app-button-container">
                                <Button
                                    type="primary"
                                    href={app.link}
                                    style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
                                >
                                    Explore
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AppsPage;
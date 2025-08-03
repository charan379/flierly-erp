import React from "react";
import { Card } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import "./AppsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AppsPage: React.FC = () => {

    const navigate = useNavigate();

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
            icon: <FontAwesomeIcon icon={faFilm} style={{ fontSize: "2rem", color: "#2196F3" }} />,
            link: "/movies",
        },
    ];

    return (
        <div className="apps-page">
            <h1 className="apps-title">
                Welcome to the Multi-App Platform
            </h1>
            <div className="app-grid">
                {apps.map((app, index) => (
                    <div key={index} className="app-card-wrapper">
                        <Card
                            hoverable
                            className="app-card"
                            cover={
                                <div className="app-icon-container">
                                    {app.icon}
                                </div>
                            }
                            onClick={() => navigate(app.link)}
                        >
                            <Card.Meta
                                title={<span className="app-title">{app.name}</span>}
                                description={<p className="app-description">{app.description}</p>}
                            />
                        </Card>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default AppsPage;

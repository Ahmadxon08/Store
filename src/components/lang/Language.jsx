import { useEffect, useState } from "react";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: "en",
    label: "EN",
    icon: "/assets/images/eng.png",
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      const lang = languages.find(
        (language) => language.value === savedLanguage
      );
      if (lang) {
        setSelectedLanguage(lang);
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    const selectedLang = languages.find((language) => language.value === lang);
    if (selectedLang) setSelectedLanguage(selectedLang);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  console.log();

  const languages = [
    {
      value: "en",
      label: "EN",
      icon: "/assets/images/eng.png",
    },
    {
      value: "ru",
      label: "RU",
      icon: "/assets/images/ru.png",
    },
    {
      value: "uz",
      label: "UZ",
      icon: "/assets/images/uz.png",
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", minWidth: 120 }}>
      <Button
        onClick={handleOpenMenu}
        onMouseOver={handleOpenMenu}
        sx={{
          display: "flex",
          color: "#565656",
          alignItems: "center",
          textTransform: "none",
          zIndex: 1000,
        }}>
        <img
          src={selectedLanguage.icon}
          alt=""
          width={20}
          height={20}
          style={{ verticalAlign: "middle" }}
        />
        <span style={{ marginLeft: "10px", textTransform: "capitalize" }}>
          {selectedLanguage.label}
        </span>
      </Button>
      <Menu
        sx={{
          marginTop: "15px",
          zIndex: 1000,
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        MenuListProps={{ onMouseLeave: handleCloseMenu }}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.value}
            onClick={() => changeLanguage(lang.value)}
            sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={lang.icon}
              alt=""
              width={20}
              height={20}
              style={{ verticalAlign: "middle" }}
              onError={(e) => (e.target.style.display = "flex")}
            />
            <span style={{ marginLeft: "10px", textTransform: "capitalize" }}>
              {lang.label}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Language;

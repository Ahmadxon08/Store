import { useEffect, useState } from "react";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useLanguageStore from "./languageStore";

const Language = () => {
  const { i18n } = useTranslation();
  const { selectedLanguage, setLanguage, languages } = useLanguageStore();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      const lang = languages.find(
        (language) => language.value === savedLanguage
      );
      if (lang) {
        setLanguage(lang.value);
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [i18n, languages, setLanguage]);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  let selectedSubtitle = null;
  let selectedTitle = null;
  if (selectedLanguage.value === "en") {
    selectedSubtitle = "subTitleEn";
    selectedTitle = "titleEn";
  } else if (selectedLanguage.value === "ru") {
    selectedSubtitle = "subTitleRu";
    selectedTitle = "titleRu";
  } else if (selectedLanguage.value === "uz") {
    selectedSubtitle = "subTitleUz";
    selectedTitle = "titleUz";
  }

  localStorage.setItem("selectedSubtitle", selectedSubtitle);
  localStorage.setItem("selectedTitle", selectedTitle);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        minWidth: 120,
        cursor: "pointer",
      }}>
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
          marginTop: "15.4px",
          zIndex: 10432,
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

import React from "react";
import { Menu } from "antd";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import propTypes from "prop-types";
const { SubMenu } = Menu;
const MenuItems = ({
  darkMode,
  toggleCollapsed,
  topMenu,
  type,
  categoriesList,
  isLoggedIn,
}) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath?.split("/") || [];
  const userRole = localStorage.getItem("USR_ROLE");
  const USER_ROLE = localStorage.getItem("USR_ROLE");

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu
      ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
      : []
  );

  const onOpenChange = (keys) => {
    setOpenKeys(
      keys[keys.length - 1] !== "recharts"
        ? [keys.length && keys[keys.length - 1]]
        : keys
    );
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1
                  ? "home"
                  : mainPathSplit.length === 2
                  ? mainPathSplit[1]
                  : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={
        !topMenu
          ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
          : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={!topMenu && <FeatherIcon icon="book-open" />}
        onClick={() => history.push(`${path}`)}
        icon={!topMenu && <FeatherIcon icon="home" />}
        key="home"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          {userRole == "student" ? "Enrolled Courses" : "Dashboard"}
        </NavLink>
      </Menu.Item>
      {/* <SubMenu key="sub2"  title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu> */}
      {userRole == "student" ? (
        <React.Fragment>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="book-open" />}
            onClick={() => history.push(`${path}/allcourses`)}
            key="allcourses"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/allcourses`}>
              All Courses
            </NavLink>
          </Menu.Item>
          <Menu.Item
            onClick={() => history.push(`${path}/newStudent`)}
            icon={!topMenu && <FeatherIcon icon="user-plus" />}
            key="newstudent"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/newStudent`}>
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item
            onClick={() => history.push(`${path}/transactions`)}
            icon={!topMenu && <FeatherIcon icon="credit-card" />}
            key="transactions"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/transactions`}>
              Transactions
            </NavLink>
          </Menu.Item>
        </React.Fragment>
      ) : userRole == "tutor" ? (
        <>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="user-plus" />}
            onClick={() => history.push(`${path}/newTutor`)}
            key="newtutor"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/newTutor`}>
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="newcourse"
            onClick={() => history.push(`${path}/createcourse`)}
            icon={!topMenu && <FeatherIcon icon="file-plus" />}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/createcourse`}>
              Create Course
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="calendar"
            onClick={() => history.push(`${path}/calendar`)}
            icon={!topMenu && <FeatherIcon icon="calendar" />}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/calendar`}>
              Batch / Calendar
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="enrolledStudents"
            icon={!topMenu && <FeatherIcon icon="users" />}
            onClick={() => history.push(`${path}/studentslist`)}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/studentslist`}>
              Enrolled Students
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="credit-card" />}
            key="transactions"
            onClick={() => history.push(`${path}/transactions`)}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/transactions`}>
              Transactions
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="file-text" />}
            key="bankaccount"
            onClick={() => history.push(`${path}/bankaccount`)}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/bankaccount`}>
              Bank Information
            </NavLink>
          </Menu.Item>
        </>
      ) : userRole == "admin" ? (
        <>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="book-open" />}
            onClick={() => history.push(`${path}/courses`)}
            key="course"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/courses`}>
              Courses
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="users" />}
            onClick={() => history.push(`${path}/tutors`)}
            key="tutor"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/tutors`}>
              Tutors
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="users" />}
            key="student"
            onClick={() => history.push(`${path}/students`)}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/students`}>
              Students
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={!topMenu && <FeatherIcon icon="credit-card" />}
            key="transactions"
            onClick={() => history.push(`${path}/transactions`)}
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/transactions`}>
              Transactions
            </NavLink>
          </Menu.Item>
        </>
      ) : null}
      {USER_ROLE !== "tutor" && USER_ROLE !== "student" ? (
        (isLoggedIn || window.innerWidth <= 991) && (
          <SubMenu
            icon={!topMenu && <FeatherIcon icon="folder" />}
            key="categories"
            title="Categories"
          >
            {categoriesList.map((cat) =>
              cat.subCategories.length <= 0 ? (
                <Menu.Item key={cat.category.id}>{cat.category.name}</Menu.Item>
              ) : (
                <>
                  <SubMenu key={cat.category.id} title={cat.category.name}>
                    {cat.subCategories.map((subcat) => (
                      <Menu.Item key={subcat.subcategory.id}>
                        {subcat.subcategory.name}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                </>
              )
            )}
          </SubMenu>
        )
      ) : (
        <></>
      )}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;

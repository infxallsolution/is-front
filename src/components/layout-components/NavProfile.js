import React, { useState } from "react";
import { Dropdown, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, LogoutOutlined, SelectOutlined } from "@ant-design/icons";
import NavItem from "./NavItem";
import Flex from "components/shared-components/Flex";
import {  changeCompanyMethod, signOut } from "store/slices/authSlice";
import {changeCompany} from "store/slices/companySlice"
import CompanyService from "services/CompanyService";
import styled from "@emotion/styled";
import {
  FONT_WEIGHT,
  MEDIA_QUERIES,
  SPACER,
  FONT_SIZES,
} from "constants/ThemeConstant";





const Icon = styled.div(() => ({
  fontSize: FONT_SIZES.LG,
}));

const Profile = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const UserInfo = styled("div")`
  padding-left: ${SPACER[2]};

  @media ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;

const Name = styled.div(() => ({
  fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
  opacity: 0.8,
}));



const MenuItem = (props) => {
  const dispatch = useDispatch();
  const handleChangeCompany = () => {
    let company = props.company.numberId
    let name = props.company.name
    let clientId = props.company.clientId
    
    localStorage.setItem("company", company);
    localStorage.setItem("companyName", name);
    localStorage.setItem("clientId", clientId);

    


    dispatch(changeCompany({company,name,clientId}));
  };


return (
  <div onClick={handleChangeCompany}>
    <Flex as="a" href={props.path} alignItems="center" gap={SPACER[2]}>
      <Icon><SelectOutlined /></Icon>
      <span>{props.label}</span>
    </Flex>
  </div >
 )

}







const MenuItemSignOut = (props) => {

  const [datos, setDatos] = useState([])

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleChangeCompany = () => {
    dispatch(changeCompanyMethod());
  };

  return (
    <>
      <div onClick={handleSignOut}>
        <Flex alignItems="center" gap={SPACER[2]}>
          <Icon>
            <LogoutOutlined />
          </Icon>
          <span>{props.label}</span>
        </Flex>
      </div>
    </>

  );
};

const items = [];

const data = await CompanyService.getCompanies('23fd6d18-927a-470e-8d71-f2959a174d1')
if (data) {
  data.map(item => {
    let company = {
      key: `${item.name}`,
      label: <MenuItem label={item.name} company={item} />
    }
    items.push(company)
  })
}

items.push({
  key: "Sign Out",
  label: <MenuItemSignOut label="Sign Out" />
})


export const NavProfile = ({ mode }) => {
  const name = useSelector((state) => state?.auth?.user?.name);

  const type = useSelector((state) => state?.companySlice?.name);
  

  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <NavItem mode={mode}>
        <Profile>
          <Avatar
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#1677FF",
            }}
          />
          <UserInfo className="profile-text">
            <Name>{name || "Hola mundo"}</Name>
            <Title>{type || "Palma"}</Title>
          </UserInfo>
        </Profile>
      </NavItem>
    </Dropdown>
  );
};

export default NavProfile;

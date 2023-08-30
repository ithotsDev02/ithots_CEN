import React from "react";
import FeatherIcon from "feather-icons-react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { UserBioBox } from "./style";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { Button } from "../../../../components/buttons/buttons";

const UserBio = ({ tutorinfo }) => {
  return (
    <UserBioBox>
      <Cards headless>
        <article className="user-info">
          <h5 className="user-info__title">About</h5>
          <p>{tutorinfo.about}</p>
        </article>
        {/* <address className="user-info">
          <h5 className="user-info__title">Contact Info</h5>
          <ul className="user-info__contact">
            <li>
              <FeatherIcon icon="mail" size={14} />{" "}
              <span>{tutorinfo.email}</span>
            </li>
            <li>
              <FeatherIcon icon="phone" size={14} />{" "}
              <span>{tutorinfo.mobile}</span>
            </li>
            <li>
              <FeatherIcon icon="message-circle" size={14} />
              <span>{tutorinfo.whatsapp}</span>
            </li>
            <li>
              <FeatherIcon icon="map-pin" size={14} />
              <span>{tutorinfo.country}</span>
            </li>
          </ul>
        </address> */}
        <address className="user-info">
          <h5 className="user-info__title">Certifications</h5>
          <ul className="user-info__contact">
            <li>
              <FeatherIcon icon="award" size={14} />{" "}
              <span>{tutorinfo.certification}</span>
            </li>
          </ul>
        </address>
        <address className="user-info">
          <h5 className="user-info__title">Employement Details</h5>
          <ul className="user-info__contact">
            <li>
              <FeatherIcon icon="briefcase" size={14} />{" "}
              <span>{tutorinfo.employment_details}</span>
            </li>
          </ul>
        </address>
      {/* <div className="user-info">
          <h5 className="user-info__title">Skills</h5>
          <div className="user-info__skills">
            <Button type="light" outlined className="btn-outlined">
              UI/UX
            </Button>
            <Button type="light" outlined className="btn-outlined">
              Branding
            </Button>
            <Button type="light" outlined className="btn-outlined">
              product design
            </Button>
            <Button type="light" outlined className="btn-outlined">
              web design
            </Button>
            <Button type="light" outlined className="btn-outlined">
              Application
            </Button>
          </div>
      </div>*/}
        {/* <div className="user-info">
          <h5 className="user-info__title">Social Profiles</h5>
          <div className="card__social">
            <Link className="btn-icon facebook" to="#">
              <FontAwesome name="facebook" />
            </Link>
            <Link className="btn-icon twitter" to="#">
              <FontAwesome name="twitter" />
            </Link>
            <Link className="btn-icon dribble" to="#">
              <FontAwesome name="dribbble" />
            </Link>
            <Link className="btn-icon instagram" to="#">
              <FontAwesome name="instagram" />
            </Link>
          </div>
        </div> */}
      </Cards>
    </UserBioBox>
  );
};

export default UserBio;

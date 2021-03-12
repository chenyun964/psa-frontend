import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SideNav extends Component {
  render() {
    return (
      <aside className="sidebar sidebar-left">
        <div className="sidebar-content">
          <div className="aside-toolbar">
            <ul className="site-logo">
              <li>
                <Link to="/dashboard"><span className="brand-text brand-text-center">Eyeviser</span></Link>
              </li>
            </ul>
          </div>
          <nav className="main-menu">
            <ul className="nav metismenu">
              <li className="sidebar-header"><span>Navigation</span></li>
              
              <li className="nav-dropdown">
                <Link to="/dashboard"><i className="icon dripicons-meter"></i><span>Dashboard</span></Link>
              </li>

              <li className="nav-dropdown">
                <Link to="/appointment"><i className="la la-calendar"></i><span>Appointment</span></Link>
              </li>

              <li className="nav-dropdown">
                <Link to="/blog"><i className="icon dripicons-blog"></i><span>Blog</span></Link>
              </li>

              <li className="nav-dropdown">
                <Link to="/doctor"><i className="la la-stethoscope"></i><span>Doctor</span></Link>
              </li>

              <li className="nav-dropdown">
                <Link to="/clinic"><i className="la la-hospital-o"></i><span>Clinic</span></Link>
              </li>

              <li className="nav-dropdown">
                <Link to="/partner"><i className="icon dripicons-user-group"></i><span>Partner</span></Link>
              </li>

            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default SideNav;

import React from "react";
import { Breadcrumb } from "react-bootstrap";
import {BreadcrumbProps, Crumb} from "../types/sharedTypes";



export const BreadcrumbComponent = (props: BreadcrumbProps) => {
  const crumbs: Crumb[] = props.crumbs || [];
  console.log('BreadcrumbComponent', crumbs);
  return (
    <Breadcrumb>
      <Breadcrumb.Item key='home' href='/'>Home</Breadcrumb.Item>
      {crumbs.map((crumb, index) => (
        <>
          {crumb.active && <Breadcrumb.Item active key={index}>{crumb.label}</Breadcrumb.Item>}
          {!crumb.active && crumb.url && <Breadcrumb.Item key={index} href={crumb.url}>{crumb.label}</Breadcrumb.Item>}
        </>
      ))}
    </Breadcrumb>
  );
};


/**
 * <Breadcrumb>
 *       <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
 *       <Breadcrumb.Item active>Physics</Breadcrumb.Item>
 *     </Breadcrumb>
 */
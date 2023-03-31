import React from 'react';
import { Image } from 'antd';
import {useState} from 'react'
export const ImageComponent = (props) => {
  console.log(props)
  return <Image
    src={props.src}
    alt={props.description}
    width={props.width}
    height={props.height}
  />
};
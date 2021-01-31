import React from 'react';
import ResponsiveText from '../components/ResponsiveText';

const styles = {
  headerStyle: {
    fontSize: '4.5%',
  },
  tabText: {
    fontSize: '2.5%',
  },
};

const ItemText = {
  HeaderText: (text, color, style = []) => (
    <ResponsiveText style={{...styles.headerStyle, ...style, color: color}}>
      {text}
    </ResponsiveText>
  ),

};

export default ItemText;

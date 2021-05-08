'use strict';
import 'arrive';

const links = document.querySelectorAll('a, area');
links.forEach(link => {
  if (link.target === '_blank') {
    link.target = '_self';
  }
});

document.body.arrive(
  'a, area',
  {
    fireOnAttributesModification: true,
    existing: true,
  },
  ele => {
    if (ele.target === '_blank') {
      ele.target = '_self';
    }
  }
);

import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../login/user.info';
import { User } from '../login/user.interface';

@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  friends: Friends[] = [
    {
      name: 'Carl',
      url: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      recomended: false,
      tags: ['c++', 'Angular', 'Integral'],
    },
    {
      name: 'Pelle',
      url:
        'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
      recomended: false,
      tags: ['c++', 'Angular', 'Integral'],
    },
    {
      name: 'Hans',
      url:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      recomended: false,
      tags: ['c++', 'Angular', 'Integral'],
    },
    {
      name: 'Isak',
      url:
        'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      recomended: false,
      tags: ['c++', 'Angular', 'Integral'],
    },
    {
      name: 'Sara',
      url:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      recomended: false,
      tags: ['c++', 'Angular', 'Integral'],
    },
  ];

  recomended: Friends[] = [
    {
      name: 'Manne',
      url:
        'https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143_960_720.png',
      recomended: true,
      tags: ['c++', 'Angular', 'Integral'],
    },
    {
      name: 'Jossan',
      url:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      recomended: true,
      tags: ['c++', 'Programming', 'Python'],
    },
    {
      name: 'Greta',
      url:
        'https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635456_960_720.png',
      recomended: true,
      tags: ['Java'],
    },
    {
      name: 'Sam',
      url:
        'https://cdn.pixabay.com/photo/2012/04/18/03/19/man-36741_960_720.png',
      recomended: true,
      tags: ['Node', 'React'],
    },
    {
      name: 'Oscar',
      url:
        'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png',
      recomended: true,
      tags: ['C', 'Assembly', 'Linux'],
    },
  ];

  constructor() {}
}

export interface Friends {
  name: string;
  url: string;
  tags: string[];
  recomended: boolean;
}

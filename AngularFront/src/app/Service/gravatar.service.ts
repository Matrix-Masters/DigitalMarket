import { Injectable } from '@angular/core';
import  md5 from 'md5';

@Injectable({
  providedIn: 'root',
})
export class GravatarService {
  private readonly baseUrl = 'https://www.gravatar.com/avatar/';

  constructor() {}

  getGravatarUrl(email: string, size: number = 200, defaultImage: string): string {
    const hash = md5(email.trim().toLowerCase());
    const params = new URLSearchParams();
    params.set('s', String(size));
    params.set('d', defaultImage);
    // Add more parameters as needed, such as rating and forcedefault

    return `${this.baseUrl}${hash}?${params.toString()}`;
}
}

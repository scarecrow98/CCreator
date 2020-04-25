import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/Application';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-editor',
  templateUrl: './app-editor.component.html',
  styleUrls: ['./app-editor.component.scss']
})
export class AppEditorComponent implements OnInit {
  public appModel: Application = new Application();

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {

  }

  createApp(): void {
    this.appService.createApp(this.appModel).subscribe(resp => {
      if (resp.status) {
        window.location.reload();
      }
    });
  }

  createSlug(): void {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    this.appModel.slug = this.appModel.name.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

}

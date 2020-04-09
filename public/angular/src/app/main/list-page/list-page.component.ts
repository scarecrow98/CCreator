import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/models/Page';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  public page: Page;
  public pageId: number;

  public columns = [
    { displayName: 'Vezetéknév', key: '44' },
    { displayName: 'Keresztnév', key: '45' },
    { displayName: 'Születési dátum', key: '46' },
  ]

  public displayedColumns = this.columns.map(x => x.key);

  public data = [
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
    { '44': 'Révész', '45': 'Ferenc', '46': '1998.07.31' },
  ];

  constructor(
    private router: Router,
    private pageService: PageService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {


  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pageId = parseInt(params['page-id']);

      this.pageService.getPage(this.pageId).subscribe(resp => {
        if (resp.status == true) {
          this.page = <Page>resp.data;
          console.log(this.page);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    });
  }
}

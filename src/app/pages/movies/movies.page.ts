import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {InfiniteScrollCustomEvent}from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})

export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.iamges;

  constructor(private movieService: MovieService, private loadingCrtl: LoadingController, private cdr: ChangeDetectorRef) { }


  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: any){
    const loading = await this.loadingCrtl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res=>{
      loading.dismiss();
      //this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      this.cdr.detectChanges();
      console.log(res);

      event?.target.complete();
      if(event){
        event.target.disabled = res.total_pages === this.currentPage;
      }

    });
  }

    loadMore(event: any){
      this.currentPage++;
      this.loadMovies(event);
    }

}

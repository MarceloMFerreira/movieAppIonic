import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, MovieDetails } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imageBaseUrl = environment.iamges;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.movieService.getMovieDetails(id).subscribe((res) => {
        console.log(res);
        this.movie = res;
      });
    }
  }
}

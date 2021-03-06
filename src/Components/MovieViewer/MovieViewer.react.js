// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from 'react';
import classnames from 'classnames';

import { Icon } from 'semantic-ui-react';

import history from '../../history';

import * as TMDBActionCreator from '../../ActionCreators/TMDBActionCreator';

const defaultProps = {};
const propTypes = {};

class MovieViewer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movieDetails: [],
		};
	}

	handlePosterImageClick(movieId) {
		history.push(`/movie/${movieId}`);
	}

	renderPosterImages() {
		const { movieDetails } = this.state;
		return (
			<div className="movieViewer__posters">
				{
					movieDetails.map((detail, i) => {
						return (
							<div
								className="movieViewer__posters__item"
								key={i}>

								<div
									className="movieViewer__posters__item__img"
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w200_and_h300_bestv2/${detail.poster_path})`
									}}
									onClick={() => this.handlePosterImageClick(detail.id)}
								>
									{
										detail.count && (
											<span className="movieViewer__posters__item__img__info">
												<Icon name="comments"/>
												{ detail.count }
											</span>
										)
									}
									{
										detail.rating && (
											<span className="movieViewer__posters__item__img__info">
												<Icon name="star"/>
												{ detail.rating.toFixed(2) }
											</span>
										)
									}
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.movies != nextProps.movies && nextProps.movies) {
			const movies = nextProps.movies;
			movies.forEach(movie => {
				TMDBActionCreator.getMovie(movie._id).then(res => {
					const detail = res.data;
					if (movie.count) {
						this.setState({
							movieDetails: [
								...this.state.movieDetails,
								{
									id: detail.id,
									title: detail.title,
									poster_path: detail.poster_path,
									count: movie.count,
								}
							].sort((a, b) => (b.count - a.count))
						});
					} else if (movie.rating) {
						this.setState({
							movieDetails: [
								...this.state.movieDetails,
								{
									id: detail.id,
									title: detail.title,
									poster_path: detail.poster_path,
									rating: movie.rating,
								}
							].sort((a, b) => (b.rating - a.rating))
						});
					}
				});
			});
		}
	}

	render() {
		const { title } = this.props;
		const { movieDetails } = this.state;
		return (
			<div
				className={
					classnames('movieViewer', this.props.className)
				}
				>
				<div className="movieViewer__title">
					{ title }
				</div>
				{ movieDetails.length > 0 && this.renderPosterImages() }
			</div>
		);
	}
}

MovieViewer.defaultProps = defaultProps;
MovieViewer.propTypes = propTypes;

export default MovieViewer;

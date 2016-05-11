(function() {

	var GitStats = {

		repositoriesList: "https://api.github.com/users/x-formation/repos",
		contributorsList: "contributors.json",
		
		_sortResults: function(data, prop, asc) {
		    data = data.sort(function(a, b) {
		        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
		    });
		},

		_renderTable: function (name, data) {

			var $table = $('#' + name + '-list');
			var template = $('#' + name + 'Template').html();

			var rendered = Mustache.render(template, data);

			$table.addClass('show');
			$table.children('tbody').html(rendered);
		},

		setRepositories: function() {
			$.getJSON(this.repositoriesList, function(data) {

				GitStats._sortResults(data, 'forks');
				GitStats._renderTable('repositories', data);	
			});
		},

		setContributors: function() {
			$.getJSON(this.contributorsList, function(data) {

				GitStats._sortResults(data, 'contributions');
				GitStats._renderTable('contributors', data);
			});
		}
		
	}

	GitStats.setRepositories();
	GitStats.setContributors();

})();


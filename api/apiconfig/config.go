package apiconfig

var apiMain string

func API(apiNew string) (val string) {

	//apiMain = "http://35.83.46.51:3000/"
	//apiMain = "http://127.0.0.1:3000/"
	apiMain = "http://44.226.139.67:3000/"

	return apiMain + apiNew
}

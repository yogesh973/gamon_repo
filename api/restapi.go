package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	apiconfig "gamonDesk/api/apiconfig"
	"io/ioutil"
	"net/http"
)

type Response struct {
	Id       int    `json:"id"`
	Status   string `json:"status"`
	Name     string `json:"user_Name"`
	Password string `json:"password"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}

type ResponseInfo struct {
	Message string `json:"message"`
	Status  string `json:"status"`
	Data    data   `json:"data"`
}

type data struct {
	Id             int    `json:"id"`
	DeviceId       string `json:"device_id"`
	DeviceName     string `json:"device_name"`
	AndroidVersion string `json:"android_version"`
	VersionName    string `json:"version_name"`
	AppName        string `json:"app_name"`
	CreatedAt      string `json:"created_at"`
	SessionId      string `json:"session_id"`
	RecordDuration string `json:"total_duration"`
	StartTime      string `json:"start_time"`
	UserId         int    `json:"user_id"`
}
type StopResponse struct {
	// Message string `json:"message"`

	Status        string `json:"status"`
	Session_id    string `json:"session_id"`
	Date          string `json:"date"`
	Start_time    string `json:"start_time"`
	End_time      string `json:"end_time"`
	sessionname   string `json:"sessionname"`
	Totaltime     string `json:"totaltime"`
	Total_duraton string `json:"total_duraton"`

	//Message string         `json:"message"`
	Data averageValues `json:"average_values"`
}

type averageValues struct {
	CpuUsage          string `json:"cpu_usage"`
	MemoryUsage       string `json:"memory_usage"`
	PowerUsage        string `json:"power_usage"`
	GpuUsage          string `json:"gpu_usage"`
	UploadDataUsage   string `json:"upload_data_usage"`
	DownloadDataUsage string `json:"download_data_usage"`
	CpuCoresAppUsage  string `json:"cpucores_app_usage"`
	AppPowerAppUsage  string `json:"apppower_app_usage"`
	AvgFpsAppUsage    string `json:"avgfps_app_usage"`
	Fps_stabliy       string `json:"fps_stabliy"`

	Peak_memory string `json:"peak_memory"`
}

func ApiHit(val map[string]string) string {

	fmt.Println("Calling API...")
	client := &http.Client{}

	jsonValue, err := json.Marshal(val)
	if err != nil {
		return fmt.Sprintf("error while marshalling: %v", err)
	}

	req, err := http.NewRequest("POST", apiconfig.API("login"), bytes.NewBuffer(jsonValue))
	if err != nil {
		return fmt.Sprintf("error logging in: %v", err)
	}

	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Sprintf("error logging in: %v", err)
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Sprintf("error reading response body: %v", err)
	}

	var responseObject Response
	if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
		return fmt.Sprintf("error while unmarshalling: %v", err)
	}

	out, err := json.Marshal(responseObject)
	if err != nil {
		return fmt.Sprintf("error while marshalling: %v", err)
	}

	return string(out)
}

func ApiHitInfo(val map[string]string, token string) string {
	fmt.Println("Calling API...")
	client := &http.Client{}

	jsonValue, _ := json.Marshal(val)

	req, err := http.NewRequest("POST", apiconfig.API("report/basic_info"), bytes.NewBuffer(jsonValue))
	if err != nil {
		return fmt.Sprintf("HTTP call failed: %v", err)
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("token", "Bearer "+token)
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Sprintf("HTTP call failed: %v", err)
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Sprintf("error reading response body: %v", err)
	}

	fmt.Println(resp.StatusCode)
	var responseObject ResponseInfo

	if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
		return fmt.Sprintf("error while unmarshalling response data: %v", err)
	}
	fmt.Printf("%+v\n", responseObject.Status)

	out, err := json.Marshal(responseObject)
	if err != nil {
		return fmt.Sprintf("error while marshalling: %v", err)

	}

	return string(out)
}

type StartResponse struct {
	Message string `json:"message"`
	Status  string `json:"status"`
	Data    data   `json:"data"`
}

func ApiHitStart(val map[string]string, token string) string {
	fmt.Println("Calling API...")
	client := &http.Client{}

	jsonValue, _ := json.Marshal(val)

	req, err := http.NewRequest("POST", apiconfig.API("report/basic_info"), bytes.NewBuffer(jsonValue))
	if err != nil {
		return fmt.Sprintf("HTTP call failed: %v", err)
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("token", "Bearer "+token)
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Sprintf("HTTP call failed: %v", err)
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Sprintf("error reading response body: %v", err)
	}

	fmt.Println(resp.StatusCode)

	var responseObject StartResponse

	if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
		return fmt.Sprintf("error while unmarshalling response data: %v", err)
	}
	fmt.Printf("%+v\n", responseObject.Status)

	out, err := json.Marshal(responseObject)
	if err != nil {
		return fmt.Sprintf("error while marshalling: %v", err)

	}

	return string(out)
}

func ApiHitStop(val []uint8, token string) string {
	fmt.Println("Calling API...")

	client := &http.Client{}

	req, err := http.NewRequest("POST", apiconfig.API("report/cpu_detail"), bytes.NewBuffer(val))
	if err != nil {
		return fmt.Sprintf("HTTP call failed: %v", err)
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("token", "Bearer "+token)
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Sprintf("HTTP call failed: %v", err)
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Sprintf("error reading response body: %v", err)
	}

	fmt.Println(resp.StatusCode)
	var responseObject StopResponse

	if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
		return fmt.Sprintf("error while unmarshalling response data: %v", err)
	}
	fmt.Printf("%+v\n", responseObject.Status)

	out, err := json.Marshal(responseObject)
	if err != nil {
		return fmt.Sprintf("error while marshalling: %v", err)
	}

	return string(out)
}

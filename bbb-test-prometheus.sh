#!/bin/bash
results=`$(dirname $0)/bbb-test`


find_key() {
  local key=$1
  local val=$(echo "${results}"|grep -oP "(?<=^${key}: ).*")
  echo $val
}

bbb_hostname=$(find_key 'hostname')

if [ -z $bbb_hostname ]; then
  >&2 echo "error: no hostname found"
  exit 1
fi

call_info_status=$(find_key 'call-info-status')
echo '# HELP bbb_call_info_status BBB Api call to meetings endpoint succesfull.'
echo '# TYPE bbb_call_info_status gauge'
if [[ -n "${call_info_status}" ]] ; then
  echo 'bbb_call_info_status{bbb_hostname="'"${bbb_hostname}"'"} '"${call_info_status}"
else
  echo 'bbb_call_info_status{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

call_info_error_count=$(find_key 'call-info-error-count')
echo '# HELP bbb_call_info_error_count BBB Number of errors on api call to meetings endpoint.'
echo '# TYPE bbb_call_info_error_count gauge'
if [[ -n "${call_info_error_count}" ]] ; then
  echo 'bbb_call_info_error_count{bbb_hostname="'"${bbb_hostname}"'"} '"${call_info_error_count}"
else
  echo 'bbb_call_info_error_count{bbb_hostname="'"${bbb_hostname}"'"} 1'
fi

call_create_status=$(find_key 'call-create-status')
echo '# HELP bbb_call_create_status BBB Api call to create meeting endpoint succesfull.'
echo '# TYPE bbb_call_create_status gauge'
if [[ -n "${call_create_status}" ]] ; then
  echo 'bbb_call_create_status{bbb_hostname="'"${bbb_hostname}"'"} '"${call_create_status}"
else
  echo 'bbb_call_create_status{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

call_create_error_count=$(find_key 'call-create-error-count')
echo '# HELP bbb_call_create_error_count BBB Number of errors on api call to create meeting endpoint.'
echo '# TYPE bbb_call_create_error_count gauge'
if [[ -n "${call_create_error_count}" ]] ; then
  echo 'bbb_call_create_error_count{bbb_hostname="'"${bbb_hostname}"'"} '"${call_create_error_count}"
else
  echo 'bbb_call_create_error_count{bbb_hostname="'"${bbb_hostname}"'"} 1'
fi

call_end_status=$(find_key 'call-end-status')
echo '# HELP bbb_call_end_status BBB Api call to end meeting endpoint succesfull.'
echo '# TYPE bbb_call_end_status gauge'
if [[ -n "${call_end_status}" ]] ; then
  echo 'bbb_call_end_status{bbb_hostname="'"${bbb_hostname}"'"} '"${call_end_status}"
else
  echo 'bbb_call_end_status{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

call_end_error_count=$(find_key 'call-end-error-count')
echo '# HELP bbb_call_end_error_count BBB Number of errors on api call to end meeting endpoint.'
echo '# TYPE bbb_call_end_error_count gauge'
if [[ -n "${call_end_error_count}" ]] ; then
  echo 'bbb_call_end_error_count{bbb_hostname="'"${bbb_hostname}"'"} '"${call_end_error_count}"
else
  echo 'bbb_call_end_error_count{bbb_hostname="'"${bbb_hostname}"'"} 1'
fi

call_join_error_count=$(find_key 'call-join-error-count')
echo '# HELP bbb_call_join_error_count BBB Number of errors on join meeting in browser.'
echo '# TYPE bbb_call_join_error_count gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_call_join_error_count{bbb_hostname="'"${bbb_hostname}"'"} '"${call_join_error_count}"
else
  echo 'bbb_call_join_error_count{bbb_hostname="'"${bbb_hostname}"'"} 1'
fi

test_join_success_username=$(find_key 'test-success-username')
echo '# HELP bbb_test_join_success_username BBB Correct username in test user join in test meeting.'
echo '# TYPE bbb_test_join_success_username gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_test_join_success_username{bbb_hostname="'"${bbb_hostname}"'"} '"${test_join_success_username}"
else
  echo 'bbb_test_join_success_username{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

test_join_success_meetingname=$(find_key 'test-success-meetingname')
echo '# HELP bbb_test_join_success_meetingname BBB Correct meetingname in test user join in test meeting.'
echo '# TYPE bbb_test_join_success_meetingname gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_test_join_success_meetingname{bbb_hostname="'"${bbb_hostname}"'"} '"${test_join_success_meetingname}"
else
  echo 'bbb_test_join_success_meetingname{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

test_join_success_audiobutton=$(find_key 'test-success-audiobutton')
echo '# HELP bbb_test_join_success_audiobutton BBB Correct audiobutton in test user join in test meeting (succesfull joined audiochannel).'
echo '# TYPE bbb_test_join_success_audiobutton gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_test_join_success_audiobutton{bbb_hostname="'"${bbb_hostname}"'"} '"${test_join_success_audiobutton}"
else
  echo 'bbb_test_join_success_audiobutton{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

stats_meeting_count=$(find_key 'stats-meeting-count')
echo '# HELP bbb_stats_meeting_count BBB Total number of running meetings.'
echo '# TYPE bbb_stats_meeting_count gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_stats_meeting_count{bbb_hostname="'"${bbb_hostname}"'"} '"${stats_meeting_count}"
else
  echo 'bbb_stats_meeting_count{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

stats_participant_count=$(find_key 'stats-participant-count')
echo '# HELP bbb_stats_participant_count BBB Total number of participants in running meetings.'
echo '# TYPE bbb_stats_participant_count gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_stats_participant_count{bbb_hostname="'"${bbb_hostname}"'"} '"${stats_participant_count}"
else
  echo 'bbb_stats_participant_count{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

stats_listener_count=$(find_key 'stats-listener-count')
echo '# HELP bbb_stats_listener_count BBB Total number of listeners in running meetings.'
echo '# TYPE bbb_stats_listener_count gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_stats_listener_count{bbb_hostname="'"${bbb_hostname}"'"} '"${stats_listener_count}"
else
  echo 'bbb_stats_listener_count{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

stats_voice_participant_count=$(find_key 'stats-voice-participant-count')
echo '# HELP bbb_stats_voice_participant_count BBB Total number of voice participants in running meetings.'
echo '# TYPE bbb_stats_voice_participant_count gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_stats_voice_participant_count{bbb_hostname="'"${bbb_hostname}"'"} '"${stats_voice_participant_count}"
else
  echo 'bbb_stats_voice_participant_count{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

stats_video_count=$(find_key 'stats-video-count')
echo '# HELP bbb_stats_video_count BBB Total number of video participants in running meetings.'
echo '# TYPE bbb_stats_video_count gauge'
if [[ -n "${call_join_error_count}" ]] ; then
  echo 'bbb_stats_video_count{bbb_hostname="'"${bbb_hostname}"'"} '"${stats_video_count}"
else
  echo 'bbb_stats_video_count{bbb_hostname="'"${bbb_hostname}"'"} 0'
fi

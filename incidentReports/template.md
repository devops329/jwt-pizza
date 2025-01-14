# Incident: YYYY-MM-DD HH-mm-ss

## Summary

> [!NOTE]
> Write a summary of the incident in a few sentences. Include what happened, why, the severity of the incident and how long the impact lasted.

```md
**EXAMPLE**:

Between the hour of {time range of incident, e.g. 15:45 and 16:35} on {DATE}, {NUMBER} users encountered {EVENT SYMPTOMS}. The event was triggered by a {CHANGE} at {TIME OF CHANGE THAT CAUSED THE EVENT}. The {CHANGE} contained {DESCRIPTION OF OR REASON FOR THE CHANGE, such as a change in code to update a system}.

A bug in this code caused {DESCRIPTION OF THE PROBLEM}. The event was detected by {MONITORING SYSTEM}. The team started working on the event by {RESOLUTION ACTIONS TAKEN}. This {SEVERITY LEVEL} incident affected {X%} of users.

There was further impact as noted by {e.g. NUMBER OF SUPPORT TICKETS SUBMITTED, SOCIAL MEDIA MENTIONS, CALLS TO ACCOUNT MANAGERS} were raised in relation to this incident.
```

## Detection

> [!NOTE]
> When did the team detect the incident? How did they know it was happening? How could we improve time-to-detection? Consider: How would we have cut that time by half?

```md
**EXAMPLE**:

This incident was detected when the {ALERT TYPE} was triggered and {TEAM/PERSON} were paged.

Next, {SECONDARY PERSON} was paged, because {FIRST PERSON} didn't own the service writing to the disk, delaying the response by {XX MINUTES/HOURS}.

{DESCRIBE THE IMPROVEMENT} will be set up by {TEAM OWNER OF THE IMPROVEMENT} so that {EXPECTED IMPROVEMENT}.
```

## Impact

> [!NOTE]
> Describe how the incident impacted internal and external users during the incident. Include how many support cases were raised.

```md
**EXAMPLE**:

For {XXhrs XX minutes} between {XX:XX UTC and XX:XX UTC} on {MM/DD/YY}, {SUMMARY OF INCIDENT} our users experienced this incident.

This incident affected {XX} customers (X% OF {SYSTEM OR SERVICE} USERS), who experienced {DESCRIPTION OF SYMPTOMS}.

{XX NUMBER OF SUPPORT TICKETS AND XX NUMBER OF SOCIAL MEDIA POSTS} were submitted.
```

## Timeline

> [!NOTE]
> Detail the incident timeline. We recommend using UTC to standardize for timezones.
> Include any notable lead-up events, any starts of activity, the first known impact, and escalations. Note any decisions or changed made, and when the incident ended, along with any post-impact events of note.

```md
**EXAMPLE**:

All times are UTC.

- _11:48_ - K8S 1.9 upgrade of control plane is finished
- _12:46_ - Upgrade to V1.9 completed, including cluster-auto scaler and the BuildEng scheduler instance
- _14:20_ - Build Engineering reports a problem to the KITT Disturbed
- _14:27_ - KITT Disturbed starts investigating failures of a specific EC2 instance (ip-203-153-8-204)
- _14:42_ - KITT Disturbed cordons the node
- _14:49_ - BuildEng reports the problem as affecting more than just one node. 86 instances of the problem show failures are more systemic
- _15:00_ - KITT Disturbed suggests switching to the standard scheduler
- _15:34_ - BuildEng reports 200 pods failed
- _16:00_ - BuildEng kills all failed builds with OutOfCpu reports
- _16:13_ - BuildEng reports the failures are consistently recurring with new builds and were not just transient.
- _16:30_ - KITT recognize the failures as an incident and run it as an incident.
- _16:36_ - KITT disable the Escalator autoscaler to prevent the autoscaler from removing compute to alleviate the problem.
- _16:40_ - KITT confirms ASG is stable, cluster load is normal and customer impact resolved.
```

## Response

> [!NOTE]
> Who responded to the incident? When did they respond, and what did they do? Note any delays or obstacles to responding.

```md
**EXAMPLE**:

After receiving a page at {XX:XX UTC}, {ON-CALL ENGINEER} came online at {XX:XX UTC} in {SYSTEM WHERE INCIDENT INFO IS CAPTURED}.

This engineer did not have a background in the {AFFECTED SYSTEM} so a second alert was sent at {XX:XX UTC} to {ESCALATIONS ON-CALL ENGINEER} into the who came into the room at {XX:XX UTC}.
```

## Root cause

> [!NOTE]
> Note the final root cause of the incident, the thing identified that needs to change in order to prevent this class of incident from happening again.

```md
**EXAMPLE**:

A bug in connection pool handling led to leaked connections under failure conditions, combined with lack of visibility into connection state.
```

## Resolution

> [!NOTE]
> Describe how the service was restored and the incident was deemed over. Detail how the service was successfully restored and you knew how what steps you needed to take to recovery.
> Depending on the scenario, consider these questions: How could you improve time to mitigation? How could you have cut that time by half?

```md
**EXAMPLE**:
By Increasing the size of the BuildEng EC3 ASG to increase the number of nodes available to support the workload and reduce the likelihood of scheduling on oversubscribed nodes

Disabled the Escalator autoscaler to prevent the cluster from aggressively scaling-down
Reverting the Build Engineering scheduler to the previous version.
```

## Prevention

> [!NOTE]
> Now that you know the root cause, can you look back and see any other incidents that could have the same root cause? If yes, note what mitigation was attempted in those incidents and ask why this incident occurred again.

```md
**EXAMPLE**:

This same root cause resulted in incidents HOT-13432, HOT-14932 and HOT-19452.
```

## Action items

> [!NOTE]
> Describe the corrective action ordered to prevent this class of incident in the future. Note who is responsible and when they have to complete the work and where that work is being tracked.

```md
**EXAMPLE**:

1. Manual auto-scaling rate limit put in place temporarily to limit failures
1. Unit test and re-introduction of job rate limiting
1. Introduction of a secondary mechanism to collect distributed rate information across cluster to guide scaling effects
```
